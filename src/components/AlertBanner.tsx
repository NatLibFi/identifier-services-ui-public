import { AlertCircle, CircleX } from 'lucide-react';

import useAlert from '@/hooks/useAlert';
import useTranslation from '@/hooks/useTranslation';

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';

function AlertBanner() {
  const { translate: t } = useTranslation();
  const { alert, hideAlert } = useAlert();
  const { hidden, titleTranslationKey, description } = alert;

  if (hidden) {
    return null;
  }

  return (
    <Alert className="flex flex-col items-center bg-brand-red-20/80">
      <div className="flex max-w-[1280px] w-full">
        <AlertCircle size={16} color="red" className="self-center" />
        <AlertTitle className="pl-2 self-center">{t(titleTranslationKey)}</AlertTitle>
        <CircleX size={16} className="self-center ml-auto" onClick={() => hideAlert()} />
      </div>
      <AlertDescription className="flex max-w-[1280px] w-full">{description}</AlertDescription>
    </Alert>
  );
}

export default AlertBanner;
