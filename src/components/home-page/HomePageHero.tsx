import HomePageHeroBox from '@/components/home-page/HomePageHeroBox';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';

import useTranslation from '@/hooks/useTranslation';

function HomePageHero() {
  const { translate: t } = useTranslation();

  return (
    <div
      id="hero-container"
      className="flex flex-col min-h-[20rem] bg-brand-darkblue-40 bg-cover items-center md:bg-[url(https://extra.kansalliskirjasto.fi/ids_banner_public.webp)]"
    >
      <div
        id="hero-content-container"
        className="h-full md:m-8 md:bg-brand-whitesmoke/50 border-4 border-brand-darkblue rounded-md pb-4 max-w-[1280px]"
      >
        <NatlibfiHeading size={'l'} className="bg-brand-darkblue-20/50 p-4 md:text-center">
          {t('pages.home.titles.main')}
        </NatlibfiHeading>

        <div className="flex flex-col lg:flex-row justify-evenly max-lg:gap-4 text-pretty text-center">
          <HomePageHeroBox>
            <NatlibfiBodyText>{t('pages.home.infoboxes.box1-1')}</NatlibfiBodyText>

            <NatlibfiBodyText>{t('pages.home.infoboxes.box1-2')}</NatlibfiBodyText>
          </HomePageHeroBox>

          <HomePageHeroBox>
            <NatlibfiBodyText>{t('pages.home.infoboxes.box2')}</NatlibfiBodyText>
          </HomePageHeroBox>

          <HomePageHeroBox>
            <NatlibfiBodyText>{t('pages.home.infoboxes.box3-1')}</NatlibfiBodyText>

            <NatlibfiBodyText>{t('pages.home.infoboxes.box3-2')}</NatlibfiBodyText>
          </HomePageHeroBox>
        </div>
      </div>
    </div>
  );
}

export default HomePageHero;
