import { ReactNode } from 'react';

import Header from '@/shared/components/common/header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default Layout;
