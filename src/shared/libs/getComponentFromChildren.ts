// src/shared/libs/getComponentFromChildren.ts
import { Children, isValidElement, ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  target: ReactElement;
}

export function getComponentFromChildren({ children, target }: Props) {
  const arr = Children.toArray(children);
  return arr.filter(
    (child) =>
      isValidElement(child) && (child as ReactElement).type === target.type,
  );
}
