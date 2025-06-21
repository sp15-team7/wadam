import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { uploadWineImage } from '@/feature/wines/services/wine.service';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (file: File) => uploadWineImage(file),
    onSuccess: () => {
      toast.success('이미지 업로드 완료');
    },
    onError: (error) => {
      toast.error('이미지 업로드 실패');
      console.error('이미지 업로드 실패:', error);
    },
  });
};
