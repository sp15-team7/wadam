export default {
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  tailwindAttributes: ['className', 'class'],
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        printWidth: 80,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        singleAttributePerLine: false,
      },
    },
  ],
};
