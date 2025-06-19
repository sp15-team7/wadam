/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 마이페이지(마이프로필) 라우팅 페이지로, 로그인 상태일 때만 접근 가능(세션 정보를 넘겨줌)
 */

import { auth } from '@/feature/auth/libs/auth';
import MyPage from '@/feature/myprofile/components/MyPage';

const MyProfilePage = async () => {
  const session = await auth();

  return <MyPage session={session!} />;
};

export default MyProfilePage;
