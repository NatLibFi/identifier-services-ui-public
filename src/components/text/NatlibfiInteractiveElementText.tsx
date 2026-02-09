import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const interactiveTextVariants = cva('font-public-sans-semibold font-semibold', {
  variants: {
    size: {
      small: 'text-[0.875rem] leading-[1.25rem] tracking-wider',
      medium: 'text-[1rem] leading-[1.5rem] tracking-wider',
      large: 'text-[1.125rem] leading-[1.625rem] tracking-wider',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

function NatlibfiInteractiveElementText({
  children,
  className,
  size,
  ...props
}: VariantProps<typeof interactiveTextVariants> & React.ComponentProps<'p'>) {
  return (
    <p className={cn(interactiveTextVariants({ size }), className)} {...props}>
      {children}
    </p>
  );
}

export default NatlibfiInteractiveElementText;
