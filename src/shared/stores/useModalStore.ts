import { create } from 'zustand';

/**
 * @author: Sumin
 * @since: 2025-06-12
 * @description: useModalStore 훅
 * 모달의 상태를 관리하는 인터페이스
 * @interface ModalState
 * @property {boolean} isOpen - 모달이 열려있는지 여부
 * @property {() => void} open - 모달을 여는 함수
 * @property {() => void} close - 모달을 닫는 함수
 */

interface ModalState {
  openModalId: string | null;
  open: (id: string) => void;
  close: () => void;
  isOpen: (id: string) => boolean;
}

/**
 * Zustand를 사용하여 모달 상태를 관리하는 스토어
 * @returns {ModalState} 모달의 상태와 상태를 변경하는 함수들을 포함한 객체
 */
export const useModalStore = create<ModalState>((set, get) => ({
  openModalId: null,
  open: (id: string) => set({ openModalId: id }),
  close: () => set({ openModalId: null }),
  isOpen: (id: string) => get().openModalId === id,
}));
