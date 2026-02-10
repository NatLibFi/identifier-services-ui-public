import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

function MaintenancePage() {
  const { translate: t } = useTranslation();

  return (
    <div className="w-[100%] text-center mt-16">
      <NatlibfiHeading size={'l'}>{t('pages.maintenance.ongoing-maintenance')}</NatlibfiHeading>
      <NatlibfiBodyText>{t('pages.maintenance.try-again-later')}</NatlibfiBodyText>
    </div>
  );
}

export default MaintenancePage;
