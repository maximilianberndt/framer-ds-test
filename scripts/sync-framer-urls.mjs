import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const { name, version } = pkg;

const urlsPath = join(root, "src/framer/urls.js");
const urlsContent = `// Auto-synced from package.json — do not edit manually
export const DS_VERSION = "${version}";
export const DS_STYLE_URL = \`https://esm.sh/${name}@\${DS_VERSION}/style.css\`;
export const DS_PACKAGE_URL = \`https://esm.sh/${name}@\${DS_VERSION}?external=react,react-dom\`;
`;

writeFileSync(urlsPath, urlsContent);

const styleImport = `import "https://esm.sh/${name}@${version}/style.css";`;
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

  content = content.replace(
    packageImportRegex,
    (line) => {
      const match = line.match(/^import (.+) from /);
      if (!match) return line;
      return `import ${match[1]} from "https://esm.sh/${name}@${version}?external=react,react-dom";`;
    },
  );

  content = content.replace(
    /^\/\/ Framer code component[^\n]*\n(?:\/\/ Copy into Framer[^\n]*\n)*/m,
    "// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)\n// Copy into Framer (Assets → Code → +)\n",
  );
  content = content.replace(
    /^\/\/ ProjectList uses static fixture data[^\n]*\n/m,
    "// ProjectList uses static fixture data baked into the design system.\n",
  );
  content = content.replace(
    /^\/\/ Place a single WebglRoot[^\n]*\n/m,
    "// Place a single WebglRoot on the page; pair with Shape components.\n",
  );
  content = content.replace(
    /^\/\/ Requires WebglRoot[^\n]*\n/m,
    "// Requires WebglRoot on the same page.\n",
  );

  writeFileSync(filePath, content);
  console.log(`synced ${relative(root, filePath)}`);
}

const framerDtsPath = join(root, "src/framer.d.ts");
let framerDts = readFileSync(framerDtsPath, "utf8");

framerDts = framerDts.replace(
  /declare module "https:\/\/esm\.sh\/[^"]+\/style\.css";/,
  `declare module "https://esm.sh/${name}@${version}/style.css";`,
);

framerDts = framerDts.replace(
  /declare module "https:\/\/esm\.sh\/[^"]+\?external=react,react-dom"/,
  `declare module "https://esm.sh/${name}@${version}?external=react,react-dom"`,
);

writeFileSync(framerDtsPath, framerDts);
console.log("synced src/framer.d.ts");
console.log(`done — version ${version}`);
