import { useSearchParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import InternalLink from '@/components/links/InternalLink';
import NatlibfiLinkText from '@/components/text/NatlibfiLinkText';

import useTranslation from '@/hooks/useTranslation';

import { getParameterizedLink } from '@/utils/link-utils';

function FooterImportantLinks() {
  const { translate: t } = useTranslation();
  const [searchParams] = useSearchParams();

  const useLink = (href: string) => getParameterizedLink(href, searchParams);

  return (
    <div id="footer-links" className="">
      <NatlibfiHeading size={'m'} color="inverted" className="mb-[16px]">
        {t('components.footer.headings.links')}
      </NatlibfiHeading>

      {/* Accessibility statement */}
      <div className="flex items-center gap-4 mb-[14px]">
        <FontAwesomeIcon icon={faArrowRight} />
        <InternalLink data-test="footer-accessibility" to={useLink('/accessibility-statement')}>
          <NatlibfiLinkText>{t('components.footer.accessibility-statement')}</NatlibfiLinkText>
        </InternalLink>
      </div>

      {/* Privacy policy */}
      <div className="flex items-center gap-4 mb-[14px]">
        <FontAwesomeIcon icon={faArrowRight} />
        <InternalLink data-test="footer-privacy" to={useLink('/privacy-policy')}>
          <NatlibfiLinkText>{t('components.footer.privacy-policy')}</NatlibfiLinkText>
        </InternalLink>
      </div>

      {/* Open Source Licenses - note: builds only in staging/prod! */}
      <div className="flex items-center gap-4 mb-[14px]">
        <FontAwesomeIcon icon={faArrowRight} />
        <a className="flex gap-2 items-baseline" target="_blank" rel="noopener noreferrer" href="/license.md">
          <NatlibfiLinkText>{t('components.footer.licenses')}</NatlibfiLinkText>
        </a>
      </div>
    </div>
  );
}

export default FooterImportantLinks;
