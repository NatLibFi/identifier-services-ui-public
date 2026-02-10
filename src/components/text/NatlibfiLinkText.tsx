import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const linkTextVariants = cva('font-public-sans-semibold hover:underline', {
  variants: {
    size: {
      small: 'text-[0.875rem] leading-[1.25rem] tracking-wider',
      medium: 'text-base tracking-wider',
      large: 'text-[1.125rem] leading-[1.625rem] tracking-wider',
    },
    focus: {
      true: 'text-brand-darkblue underline md:outline-solid md:outline-brand-darkblue md:outline-[2px] md:outline-offset-6 md:rounded-[1px]',
      false: null,
    },
    variant: {
      default: 'text-brand-darkblue',
      inverted: 'text-brand-white',
    },
  },
  defaultVariants: {
    size: 'medium',
    focus: false,
  },
});

function NatlibfiLinkText({
  focus,
  className,
  children,
  size,
  ...props
}: VariantProps<typeof linkTextVariants> & React.ComponentProps<'p'>) {
  return (
    <p className={cn(linkTextVariants({ focus, size }), className)} {...props}>
      {children}
    </p>
  );
}

export default NatlibfiLinkText;
