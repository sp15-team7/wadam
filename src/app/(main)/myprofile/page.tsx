import { auth } from '@/feature/auth/libs/auth';
import MyPage from '@/feature/myprofile/components/MyPage';

const MyProfilePage = async () => {
  const session = await auth();

  return <MyPage session={session!} />;
};

export default MyProfilePage;
