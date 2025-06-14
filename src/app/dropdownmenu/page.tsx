'use client';

import { ComboboxDemo } from '@/shared/components/common/combobox/ComboboxDemo';
import { UserMenu } from '@/shared/components/common/combobox/UserMenu';

export default function Page() {
  return (
    <main className='flex-center flex h-screen justify-between gap-50 bg-gray-50'>
      {/* Combobox 컴포넌트 */}
      <ComboboxDemo />

      {/* UserMenu 컴포넌트 */}
      <UserMenu />
    </main>
  );
}
