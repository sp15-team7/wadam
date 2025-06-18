'use client';

import { Search } from 'lucide-react';
import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { cn } from '@/shared/libs/utils/cn';

// ---------- 타입 ----------

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
  searchable?: boolean;
}

// ---------- Context ----------

const ComboboxContext = React.createContext<ComboboxContextType | null>(null);

// ---------- Root ----------

export function ComboboxRoot({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = true,
  children,
}: {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
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
      searchable,
    }),
    [open, query, options, value, onChange, placeholder, searchable],
  );

  return (
    <ComboboxContext.Provider value={ctx}>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
}

// ---------- Trigger ----------

export function ComboboxTrigger() {
  const ctx = React.useContext(ComboboxContext);
  const isComposingRef = React.useRef(false);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!ctx) return;
    if (!isComposingRef.current) {
      setInputValue(ctx.query);
    }
  }, [ctx]);

  if (!ctx) return null;

  const { open, setOpen, setQuery, placeholder, searchable, value, options } =
    ctx;

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!isComposingRef.current) {
      setQuery(value);
      setOpen(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open) {
      setOpen(true);
      if (inputRef.current && searchable) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  return (
    <PopoverTrigger asChild>
      <div
        className={cn(
          'relative flex h-[6rem] w-[412px] cursor-pointer items-center rounded-full border border-[#e5e3d7] px-8',
          'bg-[#f7f6f3]',
        )}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='combobox'
        aria-expanded={open}
        aria-controls='combobox-options-list'
      >
        {searchable ? (
          <>
            <Search className='mr-4 h-10 w-10 text-[#c2bfb1]' />
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onCompositionStart={() => {
                isComposingRef.current = true;
              }}
              onCompositionEnd={(e) => {
                isComposingRef.current = false;
                handleInputChange(e.currentTarget.value);
              }}
              onFocus={() => setOpen(true)}
              onClick={handleClick}
              placeholder={placeholder}
              className={cn(
                'txt-lg-semibold w-full border-none bg-transparent text-[3.2rem] placeholder:text-[#c2bfb1] focus:border-none focus:ring-0 focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none',
                'text-[#c2bfb1]',
              )}
              style={{ fontWeight: 400 }}
            />
          </>
        ) : (
          <span className='txt-lg-semibold text-[3.2rem] text-[#c2bfb1]'>
            {displayValue}
          </span>
        )}
      </div>
    </PopoverTrigger>
  );
}

// ---------- Options ----------

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
      id='combobox-options-list'
      className={cn(
        'mt-2 w-[412px]',
        'bg-[var(--color-white)]',
        'border border-[var(--color-secondary)]',
        'rounded-[20px]',
        'p-0',
      )}
    >
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
                  'hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]',
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
          <div className='txt-lg-semibold text-[#c2bfb1]'>
            No results found.
          </div>
        )}
      </div>
    </PopoverContent>
  );
}
