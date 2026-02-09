import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';

import useTranslation from '@/hooks/useTranslation';

function MonographPublicationTermsAndConditions() {
  const { translate: t } = useTranslation();

  return (
    <div className="pt-10">
      <NatlibfiHeading size={'m'}>
        {t('components.form-terms-and-conditions.monograph-publications.title1')}
      </NatlibfiHeading>
      <NatlibfiBodyText className="pb-6">
        {t('components.form-terms-and-conditions.monograph-publications.note1')}
      </NatlibfiBodyText>

      <NatlibfiHeading size={'m'}>
        {t('components.form-terms-and-conditions.monograph-publications.title2')}
      </NatlibfiHeading>
      <ul className="list-inside list-disc [&>li]:pb-2">
        <li>{t('components.form-terms-and-conditions.monograph-publications.responsibility-1')}</li>
        <li>{t('components.form-terms-and-conditions.monograph-publications.responsibility-2')}</li>
      </ul>
    </div>
  );
}

export default MonographPublicationTermsAndConditions;
