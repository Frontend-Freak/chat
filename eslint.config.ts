import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import { Linter } from "eslint";

const config: Linter.FlatConfig[] = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser as any,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs as any,
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
    },
  },
];

export default config;
