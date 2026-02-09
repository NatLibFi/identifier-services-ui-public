import ContentWrapper from '@/components/layout-utils/ContentWrapper';

import useTranslation from '@/hooks/useTranslation';
import NatlibfiHeading from './text/NatlibfiHeading';
import NatlibfiBodyText from './text/NatlibfiBodyText';

function NotFoundPage() {
  const { translate: t } = useTranslation();

  return (
    <ContentWrapper>
      <NatlibfiHeading size={'xl'}>{t('errors.unknown.title')}</NatlibfiHeading>
      <NatlibfiBodyText>{t('errors.unknown')}</NatlibfiBodyText>
    </ContentWrapper>
  );
}

export default NotFoundPage;
