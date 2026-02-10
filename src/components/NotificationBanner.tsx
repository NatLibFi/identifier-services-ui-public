import { useState } from 'react';

import { CircleX, Info } from 'lucide-react';

import useTranslation from '@/hooks/useTranslation';
import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';

function NotificationBanner() {
  const [hidden, setHidden] = useState(false);
  const { getCurrentLanguage } = useTranslation();
  const language = getCurrentLanguage();

  const { notificationBanner } = useApplicationConfiguration();
  const { title, text } = notificationBanner || {};

  const notificationTitle = title?.[language];
  const notificationText = text?.[language];

  if (hidden || !notificationTitle) {
    return null;
  }

  return (
    <Alert className="flex flex-col items-center bg-brand-darkblue-20/80">
      <div className="flex max-w-[1280px] w-full">
        <Info size={16} color="blue" className="self-center" />
        <AlertTitle className="pl-2 self-center">{notificationTitle}</AlertTitle>
        <CircleX size={16} className="self-center ml-auto" onClick={() => setHidden(true)} />
      </div>
      <AlertDescription className="flex max-w-[1280px] w-full">{notificationText}</AlertDescription>
    </Alert>
  );
}

export default NotificationBanner;
