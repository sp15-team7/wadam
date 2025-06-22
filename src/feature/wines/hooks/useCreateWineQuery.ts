import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  CreateWineRequest,
  CreateWineResponse,
} from '@/feature/wines/schema/wine.schema';
import { createWine } from '@/feature/wines/services/wine.service';
import { devLog } from '@/shared/utils/devLogger';

export const useCreateWineQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (wine: CreateWineRequest) => createWine(wine),
    onSuccess: (data: CreateWineResponse) => {
      toast.success('와인 등록 성공', {
        description: '와인 등록이 완료되었습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      router.push(`/wines/${data.id}`);
    },
    onError: (error) => {
      toast.error('와인 등록 실패', {
        description: '와인 등록에 실패했습니다.',
      });
      devLog(error);
    },
  });
};
