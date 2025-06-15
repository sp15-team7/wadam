import { EllipsisVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/libs/utils/cn';

const DROPDOWN_STYLES = {
  trigger: 'cursor-pointer',
  content:
    'flex h-[10.4rem] w-[12.6rem] flex-col items-center justify-center rounded-3xl',
  menuItem: cn(
    'data-[highlighted]:bg-secondary data-[highlighted]:text-[#ac271e]',
    'flex h-full w-full items-center justify-center rounded-3xl text-[1.6rem] font-semibold',
  ),
} as const;

const CardDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={DROPDOWN_STYLES.trigger}>
        <EllipsisVertical size={28} color='#ac271e' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={DROPDOWN_STYLES.content}>
        <DropdownMenuItem className={DROPDOWN_STYLES.menuItem}>
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem className={DROPDOWN_STYLES.menuItem}>
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardDropdownMenu;
