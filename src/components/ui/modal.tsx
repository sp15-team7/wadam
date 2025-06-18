'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as React from 'react';

import { cn } from '@/shared/libs/utils/cn';

export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>((props, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className='fixed inset-0 bg-black/50' />
    <Dialog.Content
      ref={ref}
      className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg'
      {...props}
    >
      {props.children}
    </Dialog.Content>
  </Dialog.Portal>
));
ModalContent.displayName = 'ModalContent';

export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    className='flex flex-col space-y-1.5 text-center sm:text-left'
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>((props, ref) => (
  <Dialog.Title
    ref={ref}
    className='text-lg leading-none font-semibold tracking-tight'
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

function Card(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-[2.5rem] border shadow-sm',
        props.className,
      )}
      {...props}
    />
  );
}

function CardHeader(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        props.className,
      )}
      {...props}
    />
  );
}

function CardTitle(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', props.className)}
      {...props}
    />
  );
}

function CardDescription(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', props.className)}
      {...props}
    />
  );
}

function CardAction(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        props.className,
      )}
      {...props}
    />
  );
}

function CardContent(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', props.className)}
      {...props}
    />
  );
}

function CardFooter(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', props.className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
