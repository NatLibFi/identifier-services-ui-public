import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva('mb-[24px]', {
  variants: {
    size: {
      xxl: 'font-dm-serif text-[2.8125rem] leading-[3.125rem]',
      xl: 'font-dm-serif text-[2.125rem] leading-[2.75rem]',
      l: 'font-public-sans-semibold text-[1.75rem] leading-[2.375rem]',
      m: 'font-public-sans-semibold text-[1.43rem] leading-[1.95rem]',
      s: 'font-public-sans-semibold text-[1.25rem] leading-[1.625rem]',
      xs: 'font-public-sans-semibold text-[1.0625rem] leading-[1.375rem]',
      xxs: 'font-public-sans-semibold text-[0.95rem] leading-[1.375rem]',
    },
    color: {
      default: 'text-brand-darkblue',
      inverted: 'text-brand-white',
    },
  },
  defaultVariants: {
    size: 'l',
    color: 'default',
  },
});

function NatlibfiHeading({
  className,
  children,
  color,
  size,
  ...props
}: VariantProps<typeof headingVariants> & React.ComponentProps<'h1'>) {
  if (size === 'xxl') {
    return (
      <h1 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h1>
    );
  }

  if (size === 'xl') {
    return (
      <h1 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h1>
    );
  }

  if (size === 'l') {
    return (
      <h2 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h2>
    );
  }

  if (size === 'm') {
    return (
      <h3 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h3>
    );
  }

  if (size === 's') {
    return (
      <h4 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h4>
    );
  }

  if (size === 'xs') {
    return (
      <h5 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h5>
    );
  }

  if (size === 'xxs') {
    return (
      <h6 className={cn(headingVariants({ color, size }), className)} {...props}>
        {children}
      </h6>
    );
  }

  return null;
}

export default NatlibfiHeading;
