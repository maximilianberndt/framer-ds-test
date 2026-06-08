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

// jsDelivr serves raw CSS reliably; esm.sh is used for the JS bundle
const styleUrl = `https://cdn.jsdelivr.net/gh/${githubRepo}@${dsRef}/dist/style.css`;
const packageUrl = `https://esm.sh/gh/${githubRepo}@${dsRef}/dist/framer-ds-test.js?external=react,react-dom`;
const stylesEntryUrl = `https://esm.sh/gh/${githubRepo}@${dsRef}/dist/styles.js`;
const framerStylesUrl = `https://esm.sh/gh/${githubRepo}@${dsRef}/src/framer/styles.js?external=react`;

const styleUrlExport = `export const STYLE_URL = "${styleUrl}";`;

function syncStyleUrlExport(filePath) {
  const content = readFileSync(filePath, "utf8");
  const updated = content.replace(
    /export const STYLE_URL =\n?  "https:\/\/[^"]+";/,
    styleUrlExport,
  );
  writeFileSync(filePath, updated);
}

syncStyleUrlExport(join(root, "src/styles.js"));
syncStyleUrlExport(join(root, "src/framer/styles.js"));

const distStylesPath = join(root, "dist/styles.js");
try {
  const distStyles = readFileSync(distStylesPath, "utf8");
  if (!distStyles.startsWith('import "./style.css"')) {
    writeFileSync(distStylesPath, `import "./style.css";\n\n${distStyles}`);
  }
} catch {
  // dist/styles.js is created by build:lib before sync:framer runs
}

const urlsPath = join(root, "src/framer/urls.js");
const urlsContent = `// Auto-synced — do not edit manually (run: pnpm sync:framer)
export const DS_GITHUB_REPO = "${githubRepo}";
export const DS_REF = "${dsRef}";
export const DS_STYLE_URL = "${styleUrl}";
export const DS_PACKAGE_URL = "${packageUrl}";
export const DS_STYLES_ENTRY_URL = "${stylesEntryUrl}";
export const DS_FRAMER_STYLES_URL = "${framerStylesUrl}";
`;

writeFileSync(urlsPath, urlsContent);

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

const importBlock = `// Framer code component — URLs synced from src/framer/urls.js (run: pnpm sync:framer)
// Copy into Framer (Assets → Code → +)

`;

const framerFiles = findFramerIndexFiles(join(root, "src/components"));

for (const filePath of framerFiles) {
  let content = readFileSync(filePath, "utf8");

  // Strip old header and style import lines
  content = content.replace(/^\/\/ Framer code component[\s\S]*?(?=import )/m, "");
  content = content.replace(
    /^import "https:\/\/(?:esm\.sh|cdn\.jsdelivr\.net)\/[^"]+\/style\.css";\n/m,
    "",
  );
  content = content.replace(
    /^import \{ use(?:Load)?DsStyles(?:, [^}]+)? \} from "https:\/\/esm\.sh\/[^"]+";\n/m,
    "",
  );
  content = content.replace(
    /  useDsStyles\(\);\n/,
    "",
  );
  content = content.replace(
    /  useLoadDsStyles\(\n    "https:\/\/[^"]+",\n  \);\n/,
    "",
  );
  content = content.replace(
    /  useLoadDsStyles\("https:\/\/[^"]+"\);\n/,
    "",
  );

  // Ensure package import uses current URL
  content = content.replace(
    /^import .+ from "https:\/\/esm\.sh\/[^"]+\?external=react,react-dom";$/m,
    (line) => {
      const match = line.match(/^import (.+) from /);
      if (!match) return line;
      return `import ${match[1]} from "${packageUrl}";`;
    },
  );

  // Prepend header
  content = importBlock + content;

  writeFileSync(filePath, content);
  console.log(`synced ${relative(root, filePath)}`);
}

const framerDtsPath = join(root, "src/framer.d.ts");
let framerDts = readFileSync(framerDtsPath, "utf8");

framerDts = framerDts.replace(
  /declare module "https:\/\/[^"]+\/style\.css";/,
  `declare module "${styleUrl}";`,
);

framerDts = framerDts.replace(
  /declare module "https:\/\/esm\.sh\/[^"]+\?external=react,react-dom"/,
  `declare module "${packageUrl}"`,
);

framerDts = framerDts.replace(
  /declare module "https:\/\/esm\.sh\/[^"]+\/src\/framer\/(?:load-styles|styles)\.js\?external=react" \{[\s\S]*?\}\n\n/,
  "",
);

if (!framerDts.includes(framerStylesUrl)) {
  framerDts = framerDts.replace(
    /declare module "framer"/,
    `declare module "${framerStylesUrl}" {
  export const STYLE_URL: string;
  export function useDsStyles(): void;
  export function useLoadDsStyles(href: string): void;
}

declare module "framer"`,
  );
}

if (!framerDts.includes(stylesEntryUrl)) {
  framerDts = framerDts.replace(
    /declare module "https:\/\/cdn\.jsdelivr\.net/,
    `declare module "${stylesEntryUrl}" {
  export const STYLE_URL: string;
}

declare module "https://cdn.jsdelivr.net`,
  );
}

writeFileSync(framerDtsPath, framerDts);
console.log("synced src/framer.d.ts");
console.log(`done — gh/${githubRepo}@${dsRef}`);
