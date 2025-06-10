export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 변경
        'style', // 코드 스타일 변경
        'refactor', // 리팩토링
        'perf', // 성능 개선
        'test', // 테스트 추가/수정
        'chore', // 기타 변경사항
        'ci', // CI 설정 변경
        'build', // 빌드 시스템 변경
        'revert', // 이전 커밋 되돌리기
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};
