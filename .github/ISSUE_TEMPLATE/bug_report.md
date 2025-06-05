---
name: "🐛 버그 리포트 (Bug Report)"
about: 발생한 버그를 상세하고 체계적으로 알려주세요.
title: "[BUG] "
labels: ["bug"]
assignees: []
---

## 🐞 버그 설명 (Describe the Bug)
- 어떤 문제가 발생했는지 명확하고 간결하게 설명해주세요.
예) 로그인 버튼을 눌러도 아무런 반응이 없습니다.

## 🔄 재현 단계 (Steps to Reproduce)
- 버그를 재현하기 위한 단계를 순서대로 작성해주세요.
예)
1. 로그인 페이지로 이동합니다.
2. 이메일과 비밀번호를 입력합니다.
3. 로그인 버튼을 클릭합니다.
4. 페이지가 새로고침되고 아무 반응이 없습니다.

## 🎯 예상 행동 (Expected Behavior)
- 정상적으로 동작했을 때 어떤 결과가 나와야 하는지 설명해주세요.
예) 로그인 후 `/dashboard` 페이지로 리다이렉트되어야 합니다.

## ⚠️ 실제 행동 (Actual Behavior)
- 실제로 어떤 문제가 발생했는지 구체적으로 설명해주세요.
예) 로그인 버튼 클릭 후 아무 반응이 없고, 콘솔에 401 에러가 출력됩니다.

## 📸 스크린샷 및 로그 (Screenshots & Logs)
- 문제 상황을 이해하는 데 도움이 되는 스크린샷이나 콘솔/서버 로그가 있다면 첨부해주세요.
예)
- 브라우저 콘솔 로그: `Uncaught TypeError: Cannot read property 'token' of undefined`
- 서버 응답: `500 Internal Server Error`

## 🛠 환경 정보 (Environment)
- 문제가 발생한 환경 정보를 최대한 상세히 적어주세요.
예)
- OS 및 버전: macOS Ventura 13.4
- 브라우저 및 버전: Chrome 114
- 디바이스 종류: 데스크탑
- 네트워크: 와이파이

## 🚨 심각도 (Severity)
- 이 버그가 서비스나 기능에 얼마나 영향을 미치는지 선택해주세요.
- [ ] Blocker (서비스 완전 불가)
- [ ] Critical (핵심 기능 불가)
- [ ] Major (기능 오류 있음)
- [ ] Minor (경미한 문제)
- [ ] Trivial (거의 영향 없음)

## 💡 추가 정보 (Additional Context)
- 문제 해결에 도움이 될 만한 추가 정보나 참고사항이 있다면 작성해주세요.
예) 임시 해결 방법, 특수 조건에서만 발생함 등