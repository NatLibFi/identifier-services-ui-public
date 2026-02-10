import useTranslation from '@/hooks/useTranslation';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

function FooterContactInformation() {
  const { translate: t } = useTranslation();

  return (
    <div id="contact-information" className="xl:text-center">
      <NatlibfiHeading color="inverted" size={'m'}>
        {t('components.footer.headings.contact-information')}
      </NatlibfiHeading>

      {/* Service location */}
      <NatlibfiBodyText marginBottom={false}>{t('components.footer.contact.address')}</NatlibfiBodyText>
      <NatlibfiBodyText marginBottom={false} className="mb-[16px]">
        {t('components.footer.contact.zip')}
      </NatlibfiBodyText>

      {/* Email */}
      <NatlibfiBodyText marginBottom={false}>{t('components.footer.contact.email-isbn-ismn')}</NatlibfiBodyText>
      <NatlibfiBodyText marginBottom={false} className="mb-[16px]">
        {t('components.footer.contact.email-issn')}
      </NatlibfiBodyText>

      {/* Phone */}
      <NatlibfiBodyText marginBottom={false}>{t('components.footer.contact.phone')}</NatlibfiBodyText>
    </div>
  );
}

export default FooterContactInformation;
