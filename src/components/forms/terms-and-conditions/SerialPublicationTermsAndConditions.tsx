import { AlertCircleIcon } from 'lucide-react';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

function SerialPublicationTermsAndConditions() {
  const { translate: t } = useTranslation();

  return (
    <div className="pt-10">
      <NatlibfiHeading size={'l'}>
        {t('components.form-terms-and-conditions.serial-publications.title')}
      </NatlibfiHeading>

      <NatlibfiHeading size={'m'}>
        {t('components.form-terms-and-conditions.serial-publications.subtitle1')}
      </NatlibfiHeading>
      <NatlibfiBodyText>{t('components.form-terms-and-conditions.serial-publications.paragraph1')}</NatlibfiBodyText>

      <NatlibfiHeading size={'m'}>
        {t('components.form-terms-and-conditions.serial-publications.subtitle2')}
      </NatlibfiHeading>
      <NatlibfiBodyText>{t('components.form-terms-and-conditions.serial-publications.paragraph2')}</NatlibfiBodyText>

      <NatlibfiHeading size={'m'}>
        {t('components.form-terms-and-conditions.serial-publications.subtitle3')}
      </NatlibfiHeading>
      <NatlibfiBodyText>{t('components.form-terms-and-conditions.serial-publications.paragraph3')}</NatlibfiBodyText>

      <div className="flex gap-2 mt-6">
        <AlertCircleIcon className="text-red-500" />
        <NatlibfiBodyText>{t('components.form-terms-and-conditions.serial-publications.note')}</NatlibfiBodyText>
      </div>
    </div>
  );
}

export default SerialPublicationTermsAndConditions;
