import { eslint } from "@eslint/config";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb",
      "prettier", // Intégration de Prettier pour désactiver les règles en conflit avec ESLint
    ],
    rules: {
      "prettier/prettier": "error", // Prévenir une erreur si les règles de Prettier ne sont pas respectées
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    },
  },
];
