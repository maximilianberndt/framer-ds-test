import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import sortImports from "@j4cobi/eslint-plugin-sort-imports";

export default defineConfig([
  globalIgnores([
    "dist",
    "src/lib/draco/**",
    "src/bones/**",
    "src/glb.d.ts",
    "src/framer.d.ts",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "sort-imports": sortImports,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "sort-imports": "off",
      "sort-imports/sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "../**", "./*", "./**"],
              message: "Use the @/ path alias instead of relative imports.",
            },
            {
              group: ["."],
              message:
                "Use the @/ path alias instead of a relative barrel import.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/framer.index.jsx"],
    rules: {
      "no-restricted-imports": "off",
      "react-refresh/only-export-components": "off",
      "sort-imports/sort-imports": "off",
    },
  },
]);
