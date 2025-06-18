import { auth } from '@/feature/auth';
import AuthButton from '@/shared/components/common/header/AuthButton';
import LoginButton from '@/shared/components/common/header/LoginButton';
import Logo from '@/shared/components/common/logo';

const AuthActions = async () => {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  return isAuthenticated ? <AuthButton /> : <LoginButton />;
};

const Header = () => {
  return (
    <header className='relative z-[10] w-dvw'>
      <div className='mx-auto flex max-w-[114rem] items-center justify-between p-10 lg:p-14'>
        <div className='flex-1' />

        {/* 중앙 로고 */}
        <div className='flex-shrink-0'>
          <Logo />
        </div>

        {/* 우측 액션 버튼 */}
        <div className='flex flex-1 justify-end'>
          <AuthActions />
        </div>
      </div>
    </header>
  );
};

export default Header;
