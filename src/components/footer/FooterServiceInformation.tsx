import useTranslation from '@/hooks/useTranslation';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

function FooterServiceInformation() {
  const { translate: t } = useTranslation();

  return (
    <div id="footer-service-information">
      <NatlibfiHeading size={'m'} color="inverted" className="mb-[16px]">
        {t('components.footer.headings.service-name')}
      </NatlibfiHeading>

      <NatlibfiBodyText>{t('components.footer.service.description-1')}</NatlibfiBodyText>

      <NatlibfiBodyText>{t('components.footer.service.description-2')}</NatlibfiBodyText>
    </div>
  );
}

export default FooterServiceInformation;
