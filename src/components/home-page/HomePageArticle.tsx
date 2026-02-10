import { cn } from '@/lib/utils';

function HomePageArticle({ className, children, ...props }: React.ComponentProps<'article'>) {
  return (
    <article className={cn('mb-[40px]', className)} {...props}>
      {children}
    </article>
  );
}

export default HomePageArticle;
