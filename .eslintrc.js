module.exports = {
  plugins: ["@tanstack/query"],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "eslint-config-next",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:react-hooks/recommended"
  ],
  globals: {
    JSX: true
  },
  rules: {
    "no-console": "error",

    // from https://github.com/soluzionifutura/eslint-config-soluzioni-futura/blob/master/index.js
    "array-bracket-spacing": ["error", "never"],
    "arrow-spacing": ["error"],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "comma-dangle": ["warn", "never"],
    "comma-spacing": ["error", { before: false, after: true }],
    curly: ["error"],
    eqeqeq: ["warn", "always"],
    indent: ["error", 2, {
      MemberExpression: 1,
      SwitchCase: 1
    }],
    "key-spacing": ["error", { mode: "strict" }],
    "keyword-spacing": ["error", { before: true, after: true }],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-multiple-empty-lines": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unused-vars": ["warn"],
    "object-curly-spacing": ["error", "always"],
    "object-shorthand": "error",
    "prefer-const": 2,
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error"],
    "spaced-comment": ["error", "always"]
  },
  overrides: [
    {
      plugins: ["@typescript-eslint"],
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        project: ["./tsconfig.json"]
      },
      rules: {
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-non-null-assertion": "error",

        // from https://github.com/soluzionifutura/eslint-config-soluzioni-futura/blob/master/index.js
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": [
          "error",
          {
            types: {
              any: {},
              unknown: {}
            }
          }
        ],
        "@typescript-eslint/class-literal-property-style": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/member-delimiter-style": ["error", {
          multiline: {
            delimiter: "none",
            requireLast: false
          },
          singleline: {
            delimiter: "comma",
            requireLast: false
          }
        }],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/typedef": "error",
        "no-unused-vars": ["off"]
      }
    }
  ],
  parser: "@babel/eslint-parser",
  ignorePatterns: [
    ".eslintrc.js",
    "next-i18next.config.js",
    "next-config.js"
  ]
}
