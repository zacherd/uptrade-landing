import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | boolean | null | undefined | ClassValue[];

function clsx(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 1)
    .filter((x): x is string => typeof x === 'string' && x.length > 0)
    .join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
