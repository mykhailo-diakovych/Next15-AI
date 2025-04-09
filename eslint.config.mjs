import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
   // import.meta.dirname is available after Node.js v20.11.0
   baseDirectory: import.meta.dirname,
});

const eslintConfig = [
   ...compat.config({
      extends: [
         "next",
         "next/core-web-vitals",
         "next/typescript",
         "plugin:prettier/recommended",
      ],
      plugins: ["prettier", "import"],
      rules: {
         "import/order": [
            "error",
            {
               groups: [
                  ["builtin", "external"], // Node.js and third-party packages
                  ["internal"], // Internal aliases
                  ["parent", "sibling", "index"], // Relative imports
               ],
               "newlines-between": "always",
               alphabetize: { order: "ignore" }, // Disables default alphabetical sorting
               pathGroups: [
                  {
                     pattern: "@features/**",
                     group: "internal",
                     position: "before",
                  },
                  {
                     pattern: "@auth/**",
                     group: "internal",
                     position: "before",
                  },
                  {
                     pattern: "@components/**",
                     group: "internal",
                     position: "before",
                  },
                  {
                     pattern: "@hooks/**",
                     group: "internal",
                     position: "before",
                  },
                  {
                     pattern: "@utils/**",
                     group: "internal",
                     position: "before",
                  },
                  {
                     pattern: "@configs/**",
                     group: "internal",
                     position: "before",
                  },
               ],
               pathGroupsExcludedImportTypes: ["builtin"],
            },
         ],
         "@typescript-eslint/no-explicit-any": "off",
      },
   }),
];

export default eslintConfig;
