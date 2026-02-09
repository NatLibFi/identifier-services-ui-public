import { cn } from '@/lib/utils';

function HomePageHeroBox({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      id="infobox-1"
      className={cn('grid lg:w-[30%] pt-6 pb-6 pl-4 pr-4 m-2 bg-brand-whitesmoke/80 rounded-xl')}
      {...props}
    >
      {children}
    </div>
  );
}

export default HomePageHeroBox;
