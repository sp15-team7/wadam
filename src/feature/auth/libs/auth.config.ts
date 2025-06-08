import { jwtDecode } from 'jwt-decode';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { refreshToken, signIn } from '@/feature/auth/services/auth.service';
import { signInSchema } from '@/feature/auth/schema/auth.schema';
import { AuthResponse } from '@/feature/auth/types/auth.types';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);
        if (validatedFields.success) {
          try {
            const authResponse: AuthResponse = await signIn(
              validatedFields.data,
            );
            if (authResponse) {
              const { user, accessToken, refreshToken } = authResponse;
              return {
                ...user,
                id: user.id.toString(),
                accessToken,
                refreshToken,
              };
            }
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        const decoded = jwtDecode(user.accessToken);
        token.accessTokenExpires = (decoded.exp as number) * 1000;
        token.user = {
          id: parseInt(user.id, 10),
          email: user.email,
          nickname: user.nickname,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          teamId: user.teamId,
        };
        return token;
      }
      if (Date.now() >= token.accessTokenExpires) {
        try {
          const refreshed = await refreshToken({
            refreshToken: token.refreshToken,
          });
          token.accessToken = refreshed.accessToken;
          const decoded = jwtDecode(refreshed.accessToken);
          token.accessTokenExpires = (decoded.exp as number) * 1000;
          delete token.error;
        } catch (error) {
          token.error = 'RefreshAccessTokenError';
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
};
