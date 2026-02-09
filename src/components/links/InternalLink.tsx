import { Link, type LinkProps } from 'react-router';

import { cn } from '@/lib/utils';

function InternalLink({ children, className, to, ...props }: LinkProps) {
  return (
    <Link className={cn('', className)} to={to} {...props}>
      {children}
    </Link>
  );
}

export default InternalLink;
