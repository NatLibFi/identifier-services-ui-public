import { useSearchParams } from 'react-router';

import useTranslation from '@/hooks/useTranslation';

import LanguageSelection from '@/components/header/LanguageSelection';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import InternalLink from '@/components/links/InternalLink';

import { getLanguageSearchParam, getParameterizedLink } from '@/utils/link-utils';

function Header() {
  const [searchParams] = useSearchParams();
  const onlyLanguageSearchParams = getLanguageSearchParam(searchParams);

  const { translate: t } = useTranslation();

  return (
    <header className="grid w-[100%] bg-brand-darkblue justify-items-center">
      <div
        id="header-container"
        className="w-[95%] max-w-[1280px] justify-self-center grid grid-cols-1 md:grid-cols-3 items-center justify-items-center md:justify-items-normal pt-6 pb-6"
      >
        {/* Logo */}
        <div id="logo-container" className="hidden md:block md:justify-self-start md:pl-4">
          <InternalLink
            aria-label={t('components.navbar.home')}
            to={getParameterizedLink('/', onlyLanguageSearchParams)}
          >
            <img
              aria-hidden={true}
              className="w-[100px] h-[73px]"
              src="https://static.kansalliskirjasto.fi/KK_logo_keskitetty_white.png"
              loading="lazy"
            />
          </InternalLink>
        </div>

        {/* Application name */}
        <div id="application-name-container" className="md:justify-self-center-safe">
          <NatlibfiHeading size={'xl'} color="inverted" className="mb-8 md:mb-0">
            {t('components.header.title')}
          </NatlibfiHeading>
        </div>

        {/* Language selection */}
        <div className="md:justify-self-end-safe md:pr-4">
          <LanguageSelection />
        </div>
      </div>
    </header>
  );
}

export default Header;
