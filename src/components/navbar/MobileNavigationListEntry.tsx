import { cn } from '@/lib/utils';

function MobileNavigationListEntry({ className, children, ...props }: React.ComponentProps<'li'>) {
  return (
    <li className={cn('pb-2 pt-2', className)} {...props}>
      {children}
    </li>
  );
}

export default MobileNavigationListEntry;
