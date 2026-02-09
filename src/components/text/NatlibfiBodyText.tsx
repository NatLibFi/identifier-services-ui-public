import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const bodyTextVariants = cva('', {
  variants: {
    size: {
      small: 'font-public-sans-light text-[0.875rem] leading-[1.25rem]',
      medium: 'font-public-sans-light text-base tracking-normal',
      large: 'font-public-sans text-[1.2rem] leading-[2.62rem]',
    },
    marginBottom: {
      true: 'mb-4',
      false: null,
    },
  },
  defaultVariants: {
    size: 'medium',
    marginBottom: true,
  },
});

function NatlibfiBodyText({
  className,
  children,
  marginBottom,
  size,
  ...props
}: VariantProps<typeof bodyTextVariants> & React.ComponentProps<'p'>) {
  return (
    <p className={cn(bodyTextVariants({ marginBottom, size }), className)} {...props}>
      {children}
    </p>
  );
}

export default NatlibfiBodyText;
