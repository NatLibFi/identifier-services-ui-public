import { Unplug } from 'lucide-react';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

function DeprecatedIdentifierDownloadPage() {
  const { translate: t } = useTranslation();
  return (
    <div className="flex flex-col w-[100%] text-center mt-16">
      <Unplug size={40} className="self-center text-brand-red mb-6" />
      <NatlibfiHeading size={'l'}>{t('pages.deprecated-identifier-download.title')}</NatlibfiHeading>
      <NatlibfiBodyText>{t('pages.deprecated-identifier-download.description')}</NatlibfiBodyText>
    </div>
  );
}

export default DeprecatedIdentifierDownloadPage;
