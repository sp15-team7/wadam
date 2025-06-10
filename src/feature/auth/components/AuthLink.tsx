/**
 * @author Hyun
 * @since 2025-06-10
 * @description: 로그인/회원가입 페이지에서 공통으로 사용되는 링크 컴포넌트(로그인하러가기, 회원가입 하러가기 같은..)
 */

import Link from 'next/link';

interface AuthLinkProps {
  label: string;
  linkText: string;
  href: string;
}

const DIV_STYLE = 'mt-2 flex flex-row items-center justify-center gap-x-4';
const LINK_STYLE = 'text-primary text-md-regular underline';
const SPAN_STYLE = 'text-secondary text-md-small';

const AuthLink = ({ label, linkText, href }: AuthLinkProps) => {
  return (
    <div className={DIV_STYLE}>
      <span className={SPAN_STYLE}>{label}</span>
      <Link href={href} className={LINK_STYLE}>
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;
