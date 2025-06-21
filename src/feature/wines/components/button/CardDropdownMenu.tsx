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

interface CardDropdownMenuProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const CardDropdownMenu = ({
  onEditClick,
  onDeleteClick,
}: CardDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={DROPDOWN_STYLES.trigger}>
        <EllipsisVertical
          color='#ac271e'
          className='h-[2.4rem] w-[2.4rem] md:h-[2.8rem] md:w-[2.8rem]'
          aria-label='카드 메뉴 열기'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={DROPDOWN_STYLES.content}>
        {onEditClick && (
          <DropdownMenuItem
            className={DROPDOWN_STYLES.menuItem}
            onClick={onEditClick}
          >
            수정하기
          </DropdownMenuItem>
        )}
        {onDeleteClick && (
          <DropdownMenuItem
            className={cn(DROPDOWN_STYLES.menuItem, 'text-primary')}
            onClick={onDeleteClick}
          >
            삭제하기
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardDropdownMenu;
