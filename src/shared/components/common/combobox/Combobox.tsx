'use client';

import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { cn } from '@/shared/libs/utils/cn';

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  options: ComboboxOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const ComboboxContext = React.createContext<ComboboxContextType | null>(null);

export function ComboboxRoot({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  children,
}: {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const ctx: ComboboxContextType = React.useMemo(
    () => ({
      open,
      setOpen,
      query,
      setQuery,
      options,
      value,
      onChange,
      placeholder,
    }),
    [open, setOpen, query, setQuery, options, value, onChange, placeholder],
  );

  return (
    <ComboboxContext.Provider value={ctx}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
}

export function ComboboxTrigger() {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) return null;
  const { open, setOpen, options, value, placeholder } = ctx;
  return (
    <PopoverTrigger asChild>
      <Button
        variant='secondary'
        role='combobox'
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cn(
          'w-[412px]',
          'flex items-center justify-between',
          'rounded-full',
          'border border-[var(--color-secondary)]',
          'bg-[var(--color-white)]',
          'px-6 py-4',
          'text-[var(--color-gray)]',
        )}
      >
        <span className='txt-lg-semibold'>
          {options.find((o) => o.value === value)?.label || placeholder}
        </span>
        <ChevronsUpDown className='opacity-50' />
      </Button>
    </PopoverTrigger>
  );
}

export function ComboboxOptions() {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) return null;
  const { setOpen, query, setQuery, options, value, onChange } = ctx;
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <PopoverContent
      align='center'
      className={cn(
        'mt-2 w-[412px]',
        'bg-[var(--color-white)]',
        'border border-[var(--color-secondary)]',
        'rounded-[20px]',
        'p-0',
      )}
    >
      <div className='flex flex-col space-y-2 p-2'>
        <div className='flex flex-col space-y-2 p-2'>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-full px-6 py-4 text-left',
                    'hover:text-[var(--color-primary)]',
                    'hover:bg-[var(--color-secondary)]',
                    isSelected
                      ? 'rounded-[20px] text-[var(--color-primary)]'
                      : 'text-[var(--color-black)]',
                    i !== 0 && 'mt-1',
                  )}
                >
                  <span className='txt-lg-semibold'>{opt.label}</span>
                </button>
              );
            })
          ) : (
            <div className='px-6 py-4 text-gray-500'>No results found.</div>
          )}
        </div>
      </div>
    </PopoverContent>
  );
}
