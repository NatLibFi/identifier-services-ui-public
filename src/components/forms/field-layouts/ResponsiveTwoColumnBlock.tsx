import { cn } from '@/lib/utils';

interface ResponsiveTwoColumnBlockProps extends React.ComponentProps<'div'> {
  asChild?: boolean; // Whether column block is not top level in card
}

// Creates grid display with two columns for TailwindCSS lg breakpoint
// Supports defining as child block for lg display
function ResponsiveTwoColumnBlock({ asChild, className, children, ...props }: ResponsiveTwoColumnBlockProps) {
  if (asChild) {
    return (
      <div className={cn('lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-x-2 gap-y-4 lg:gap-y-6', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('grid max-lg:gap-y-2 lg:grid-cols-2 lg:gap-x-2 gap-y-4 lg:gap-y-6', className)} {...props}>
      {children}
    </div>
  );
}

export default ResponsiveTwoColumnBlock;
