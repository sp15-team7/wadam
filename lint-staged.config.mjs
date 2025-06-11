import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file  ')}`;

export default {
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    buildEslintCommand,
    () => 'tsc --noEmit',
  ],
  '**/*.{json,css,md,yml,yaml,html}': ['prettier --write'],
  '**/*.{png,jpg,jpeg,gif,svg,ico,webp}': ['imagemin-lint-staged'],
  'package.json': ['pnpm audit --audit-level=high', 'prettier --write'],
  '**/.env*': [
    () =>
      'echo "⚠️  환경 변수 파일이 변경되었습니다. 민감한 정보가 포함되지 않았는지 확인해주세요."',
  ],
};
