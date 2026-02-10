import { useSearchParams } from 'react-router';

import { ThumbsUp } from 'lucide-react';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

function FormSuccessPage() {
  const [searchParams] = useSearchParams();
  const { translate: t } = useTranslation();

  const form = searchParams.get('form');
  const knownForms = ['monograph-publisher', 'monograph-publication', 'serial-publication'];
  const isKnownForm = form && knownForms.includes(form);

  if (!isKnownForm) {
    return (
      <div className="w-[100%] text-center mt-16">
        <NatlibfiHeading size={'l'}>{t('pages.form-success.not-found-title')}</NatlibfiHeading>
        <NatlibfiBodyText>{t('pages.form-success.not-found-message')}</NatlibfiBodyText>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[100%] text-center mt-16">
      <ThumbsUp size={40} className="self-center text-brand-green mb-6" />
      <NatlibfiHeading size={'l'}>{t(`pages.form-success.forms.${form}.title`)}</NatlibfiHeading>
      <NatlibfiBodyText>{t(`pages.form-success.forms.${form}.description`)}</NatlibfiBodyText>
    </div>
  );
}

export default FormSuccessPage;
