import { create } from 'zustand';

interface UserStore {
  profileImg: string;
  nickname: string;
  updateProfileImg: (url: string) => void;
  updateNickname: (name: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profileImg: '/icons/ui/icon-default-user.svg',
  nickname: '',
  updateProfileImg: (url) => set({ profileImg: url }),
  updateNickname: (name) => set({ nickname: name }),
}));
