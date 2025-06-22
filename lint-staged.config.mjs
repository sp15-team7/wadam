import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file  ')}`;

export default {
  '**/*.{js,jsx,ts,tsx}': ['prettier --write', buildEslintCommand, () => 'tsc --noEmit'],
  '**/*.{json,css,md,yml,yaml,html}': ['prettier --write'],

  'package.json': ['pnpm audit --audit-level=high', 'prettier --write'],
  '**/.env*': [() => 'echo "⚠️  환경 변수 파일이 변경이 감지되었습니다.'],
};
