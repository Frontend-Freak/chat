import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
const config = [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: parser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": eslintPluginTs,
        },
        rules: Object.assign({}, eslintPluginTs.configs.recommended.rules),
    },
];
export default config;
