import { jwtDecode } from 'jwt-decode';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { refreshToken, signIn } from '@/feature/auth/services/auth.service';
import { signInSchema } from '@/feature/auth/schema/auth.schema';
import { AuthResponse } from '@/feature/auth/types/auth.types';

/**
 * NextAuth.js의 핵심 설정 객체입니다.
 *
 * 이 객체는 인증 프로바이더, 콜백, 세션 관리 전략, 페이지 경로 등
 * Auth.js의 모든 동작을 제어합니다.
 *
 * @see https://authjs.dev/reference/nextjs
 */
export const authConfig: NextAuthConfig = {
  /**
   * 애플리케이션에서 사용할 인증 방법을 정의합니다.
   * 여러 프로바이더(Google, Kakao 등)를 배열에 추가하여 사용할 수 있습니다.
   */
  providers: [
    /**
     * 이메일과 비밀번호를 사용하는 가장 기본적인 자격증명(Credentials) 방식입니다.
     */
    Credentials({
      /**
       * 'signIn' 함수가 호출될 때 실행되는 핵심 인증 로직입니다.
       * 제공된 자격증명(credentials)을 검증하고, 유효하다면 사용자 객체를,
       * 그렇지 않다면 null을 반환해야 합니다.
       *
       * @param credentials - 로그인 폼에서 전달된 객체 (e.g., { email, password })
       * @returns 성공 시: 백엔드로부터 받은 모든 정보가 포함된 사용자 객체
       * @returns 실패 시: null
       */
      authorize: async (credentials) => {
        // 1. Zod 스키마를 사용하여 서버 측에서 입력값의 유효성을 검사합니다.
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          try {
            // 2. 유효성 검사를 통과하면, 실제 백엔드 API로 로그인 요청을 보냅니다.
            const authResponse: AuthResponse = await signIn(
              validatedFields.data,
            );

            if (authResponse) {
              // 3. 인증에 성공하면, 백엔드로부터 받은 데이터를 Auth.js가
              //    이해할 수 있는 단일 객체 형태로 재조립하여 반환합니다.
              //    (중요: Auth.js의 내부 User 타입은 id를 string으로 기대하므로 변환합니다.)
              const { user, accessToken, refreshToken } = authResponse;
              return {
                ...user,
                id: user.id.toString(),
                accessToken,
                refreshToken,
              };
            }
          } catch (error) {
            // 백엔드 API 요청 중 에러(401 Unauthorized 등)가 발생하면 null을 반환하여
            // 로그인 실패를 Auth.js에 알립니다.
            console.error('Authorize Error:', error);
            return null;
          }
        }
        // Zod 유효성 검사 실패 시 로그인 실패 처리
        return null;
      },
    }),
  ],

  /**
   * 인증 과정의 특정 이벤트 발생 시 실행될 콜백 함수들을 정의합니다.
   * JWT 생성/관리, 세션 객체 커스터마이징 등 핵심 로직이 포함됩니다.
   */
  callbacks: {
    /**
     * 이 콜백은 JWT(JSON Web Token)가 생성되거나 업데이트될 때마다 호출됩니다.
     * 예를 들어 로그인 성공 시 또는 세션을 확인할 때마다 실행됩니다.
     * 이 함수가 반환하는 'token' 객체가 암호화되어 브라우저 쿠키에 저장됩니다.
     *
     * @param token - 현재 처리 중인 JWT 객체. 기존 세션 정보가 담겨 있습니다.
     * @param user - 'authorize' 콜백이 반환한 사용자 객체. **오직 로그인 직후 최초 한 번만** 전달됩니다.
     * @returns 최종적으로 쿠키에 저장될 업데이트된 JWT 객체.
     */
    async jwt({ token, user }) {
      // Phase 1: 최초 로그인 (user 객체가 존재할 때)
      // 이 블록은 사용자가 막 로그인을 성공한 시점에 단 한 번만 실행됩니다.
      if (user) {
        // authorize 콜백에서 전달받은 값들로 token 객체를 초기화합니다.
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // accessToken을 디코딩하여 만료 시간을 Unix 타임스탬프(밀리초)로 변환해 저장합니다.
        // 이 값은 나중에 토큰 갱신 시점을 판단하는 데 사용됩니다.
        const decoded = jwtDecode(user.accessToken);
        token.accessTokenExpires = (decoded.exp as number) * 1000;

        // 앱 전반에서 일관되게 사용할 원본 사용자 정보를 token.user에 저장합니다.
        // (authorize에서 string으로 변환했던 id를 다시 number로 되돌립니다.)
        token.user = {
          id: parseInt(user.id, 10),
          email: user.email,
          nickname: user.nickname,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          teamId: user.teamId,
        };
        // 초기화된 token 객체를 반환합니다. 이 정보가 쿠키에 저장됩니다.
        return token;
      }

      // Phase 2: 후속 세션 확인 (사용자가 페이지 이동/새로고침 할 때)
      // 이 아래 로직은 로그인 후 모든 페이지 요청에서 실행됩니다.

      // Case 1: accessToken이 아직 만료되지 않은 경우
      // 가장 일반적인 경우로, 아무 작업 없이 기존 토큰을 그대로 반환하여 불필요한 연산을 방지합니다.
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Case 2: accessToken이 만료된 경우 -> refreshToken으로 갱신 시도
      // 이 블록은 accessToken의 유효기간이 지났을 때만 실행됩니다.
      try {
        console.log('액세스 토큰이 만료되었습니다. 갱신을 시도합니다.');
        const refreshed = await refreshToken({
          refreshToken: token.refreshToken,
        });

        // 새로운 accessToken과 만료 시간으로 token 객체를 업데이트합니다.
        token.accessToken = refreshed.accessToken;
        const decoded = jwtDecode(refreshed.accessToken);
        token.accessTokenExpires = (decoded.exp as number) * 1000;

        // 혹시 이전에 발생했을 수 있는 에러 상태를 제거합니다.
        delete token.error;

        // 성공적으로 갱신된 token 객체를 반환합니다.
        // 이 새 정보가 담긴 쿠키가 브라우저로 전송되어 세션이 연장됩니다.
        return token;
      } catch (error) {
        console.error('액세스 토큰 갱신 중 오류가 발생했습니다:', error);
        // refreshToken 자체도 만료되었거나, 서버에 문제가 생긴 경우입니다.
        // 이 경우, 사용자를 즉시 로그아웃시키는 대신 에러 상태를 설정하여
        // 클라이언트 측에서 세션 만료를 인지하고 부드럽게 처리할 기회를 줍니다.
        token.error = 'RefreshAccessTokenError';
        // 에러가 발생했지만, 기존 토큰(만료된 accessToken 포함)을 반환합니다.
        return token;
      }
    },

    /**
     * 'useSession' 훅이나 'auth()' 함수로 세션을 조회할 때마다 호출됩니다.
     * JWT 콜백이 실행된 직후에 실행되며, 클라이언트에게 노출될 'session' 객체의
     * 내용물을 최종적으로 결정하는 역할을 합니다. (데이터 필터링)
     *
     * @param session - Auth.js가 기본적으로 제공하는 세션 객체.
     * @param token - 'jwt' 콜백이 최종적으로 반환한 JWT 객체. 쿠키의 모든 정보가 담겨있습니다.
     * @returns 클라이언트 컴포넌트나 API에서 사용할 최종 session 객체.
     */
    async session({ session, token }) {
      // 1. 'jwt' 콜백의 token 객체에 저장된 커스텀 데이터를 session 객체에 복사합니다.
      session.user = token.user as any; // 'token.user'는 우리가 정의한 CustomUser 타입입니다.
      session.accessToken = token.accessToken;
      session.error = token.error;

      // 2. (보안) refreshToken과 같이 민감한 정보는 절대 session 객체에 포함하지 않습니다.

      // 3. 최종적으로 커스터마이징된 session 객체를 반환합니다.
      return session;
    },
  },

  /**
   * 세션 관리 전략을 설정합니다.
   * 'jwt'는 데이터베이스 없이 세션을 관리하는 방식이며, 모든 세션 정보가
   * 암호화되어 쿠키(JWE)에 저장됩니다.
   */
  session: { strategy: 'jwt' },

  /**
   * 인증 관련 페이지들의 경로를 설정합니다.
   */
  pages: {
    signIn: '/signin', // 로그인 페이지 경로
    error: '/signin', // 인증 관련 에러 발생 시 리다이렉트 될 페이지 (예: OAuth 실패)
  },
};
