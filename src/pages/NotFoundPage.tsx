import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

function NotFoundPage() {
  const { translate: t } = useTranslation();

  return (
    <div className="w-[100%] text-center mt-16">
      <NatlibfiHeading size={'l'}>{t('pages.not-found.not-found-title')}</NatlibfiHeading>
      <NatlibfiBodyText>{t('pages.not-found.not-found-message')}</NatlibfiBodyText>
    </div>
  );
}

export default NotFoundPage;
