// Auth configuration
export { auth, handlers, signIn, signOut } from './libs/auth';
export { authConfig } from './libs/auth.config';

// Types
export type {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  User,
} from './types/auth.types';

// Schemas and validation
export type { SignInFormData, SignUpFormData } from './schema/auth.schema';
export { signInFormSchema, signUpFormSchema } from './schema/auth.schema';

// Services
export {
  refreshToken,
  signIn as signInService,
  signUp,
} from './services/auth.service';

// Actions
export { signUpAction } from './actions/auth.action';

// Hooks
export { useAuthSession } from './hooks/useAuthSession';

// Constants
export { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants/auth.message';

// Utils
export {
  getTokenExpiration,
  isTokenExpired,
  parseUserId,
  transformUserForNextAuth,
  transformUserFromNextAuth,
} from './utils/jwt.utils';
