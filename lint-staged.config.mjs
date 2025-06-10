import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file  ')}`;

export default {
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    buildEslintCommand,
    () => 'tsc --noEmit',
  ],
  '**/*.{json,css,md,yml,yaml,html}': ['prettier --write'],
  '**/*.{png,jpg,jpeg,gif,svg,ico,webp}': ['imagemin-lint-staged'],
};
