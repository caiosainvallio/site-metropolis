import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Base de lint compartilhada pelos apps do monorepo. Cada app reexporta este
// config; ignores específicos de app podem ser acrescentados no arquivo local.
const base = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    ".vinext/**",
    "next-env.d.ts",
  ]),
]);

export default base;
