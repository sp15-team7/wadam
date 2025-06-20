/**
 * @description NODE_ENV가 development일 때만 콘솔에 로그를 출력합니다.
 * @param {...any[]} args - console.log에 전달할 인자
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
