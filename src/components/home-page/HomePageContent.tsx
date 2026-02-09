import ExternalLink from '@/components/links/ExternalLink';
import HomePageArticle from '@/components/home-page/HomePageArticle';
import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

import { getHomePageLink } from '@/components/home-page/homepage-utils';

function HomePageContent() {
  const { translate: t, getCurrentLanguage } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  return (
    <>
      <HomePageArticle>
        <NatlibfiHeading size={'l'}>{t('pages.home.form-instructions.title')}</NatlibfiHeading>

        <NatlibfiBodyText>{t('pages.home.form-instructions.text1')}</NatlibfiBodyText>
        <NatlibfiBodyText>{t('pages.home.form-instructions.text2')}</NatlibfiBodyText>
        <NatlibfiBodyText marginBottom={false}>{t('pages.home.form-instructions.text3')}</NatlibfiBodyText>
      </HomePageArticle>

      <HomePageArticle>
        <NatlibfiHeading size={'l'}>{t('pages.home.isbn-ismn-info.title')}</NatlibfiHeading>

        <NatlibfiBodyText>{t('pages.home.isbn-ismn-info.text1')}</NatlibfiBodyText>
        <NatlibfiBodyText>{t('pages.home.isbn-ismn-info.text2')}</NatlibfiBodyText>
        <NatlibfiBodyText>{t('pages.home.isbn-ismn-info.text3')}</NatlibfiBodyText>

        <div id="isbn-ismn-info-links" className="grid gap-y-4 md:gap-y-0 md:flex md:gap-6">
          <ExternalLink
            href={getHomePageLink(currentLanguage, 'kk-isbn')}
            text={t('pages.home.isbn-ismn-info.isbn-link')}
          />
          <ExternalLink
            href={getHomePageLink(currentLanguage, 'kk-ismn')}
            text={t('pages.home.isbn-ismn-info.ismn-link')}
          />
        </div>
      </HomePageArticle>

      <HomePageArticle>
        <NatlibfiHeading size={'l'}>{t('pages.home.issn-info.title')}</NatlibfiHeading>

        <NatlibfiBodyText>{t('pages.home.issn-info.text1')}</NatlibfiBodyText>
        <NatlibfiBodyText>{t('pages.home.issn-info.text2')}</NatlibfiBodyText>
        <NatlibfiBodyText>{t('pages.home.issn-info.text3')}</NatlibfiBodyText>

        <div id="isbn-ismn-info-links" className="grid gap-y-4 md:gap-y-0 md:flex md:gap-6">
          <ExternalLink
            href={getHomePageLink(currentLanguage, 'kk-issn')}
            text={t('pages.home.issn-info.kk-issn-link')}
          />

          <ExternalLink href="https://portal.issn.org/" text={t('pages.home.issn-info.issn-portal-link')} />
        </div>
      </HomePageArticle>
    </>
  );
}

export default HomePageContent;
