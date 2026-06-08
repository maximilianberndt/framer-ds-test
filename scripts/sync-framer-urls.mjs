import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const { repository } = pkg;

const githubRepo =
  repository?.url?.match(/github\.com[/:](.+?)(?:\.git)?$/)?.[1] ??
  "maximilianberndt/framer-ds-test";
const dsRef = pkg.framer?.ref ?? "main";

const styleUrl = `https://esm.sh/gh/${githubRepo}@${dsRef}/dist/style.css`;
const packageUrl = `https://esm.sh/gh/${githubRepo}@${dsRef}/dist/framer-ds-test.js?external=react,react-dom`;

const urlsPath = join(root, "src/framer/urls.js");
const urlsContent = `// Auto-synced — do not edit manually (run: pnpm sync:framer)
export const DS_GITHUB_REPO = "${githubRepo}";
export const DS_REF = "${dsRef}";
export const DS_STYLE_URL = "${styleUrl}";
export const DS_PACKAGE_URL = "${packageUrl}";
`;

writeFileSync(urlsPath, urlsContent);

const styleImport = `import "${styleUrl}";`;
const packageImportRegex =
  /^import .+ from "https:\/\/esm\.sh\/[^"]+\?external=react,react-dom";$/m;

function findFramerIndexFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      findFramerIndexFiles(fullPath, files);
    } else if (entry === "framer.index.jsx") {
      files.push(fullPath);
    }
  }
  return files;
}

const framerFiles = findFramerIndexFiles(join(root, "src/components"));

for (const filePath of framerFiles) {
  let content = readFileSync(filePath, "utf8");

  content = content.replace(
    /^import "https:\/\/esm\.sh\/[^"]+\/style\.css";$/m,
    styleImport,
  );

  content = content.replace(packageImportRegex, (line) => {
    const match = line.match(/^import (.+) from /);
    if (!match) return line;
    return `import ${match[1]} from "${packageUrl}";`;
  });

  content = content.replace(
    /^\/\/ Framer code component[^\n]*\n(?:\/\/ Copy into Framer[^\n]*\n)*/m,
    "// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)\n// Copy into Framer (Assets → Code → +)\n",
  );
  content = content.replace(
    /^\/\/ ProjectList uses static fixture data[^\n]*\n/m,
    "// ProjectList uses static fixture data baked into the design system.\n",
  );
  content = content.replace(
    /^\/\/ Replace VERSION[^\n]*\n/m,
    "",
  );

  writeFileSync(filePath, content);
  console.log(`synced ${relative(root, filePath)}`);
}

const framerDtsPath = join(root, "src/framer.d.ts");
let framerDts = readFileSync(framerDtsPath, "utf8");

framerDts = framerDts.replace(
  /declare module "https:\/\/esm\.sh\/[^"]+\/style\.css";/,
  `declare module "${styleUrl}";`,
);

framerDts = framerDts.replace(
  /declare module "https:\/\/esm\.sh\/[^"]+\?external=react,react-dom"/,
  `declare module "${packageUrl}"`,
);

writeFileSync(framerDtsPath, framerDts);
console.log("synced src/framer.d.ts");
console.log(`done — gh/${githubRepo}@${dsRef}`);
