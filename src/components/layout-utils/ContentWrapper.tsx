import { cn } from '@/lib/utils';

// Wraps page content to max width of 1280px. Allows growth of content with flex-col.
function ContentWrapper({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('w-[95%] flex flex-col max-w-[1280px] mr-4 ml-4 xl:mr-auto xl:ml-auto mt-10 mb-10', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default ContentWrapper;
