import { createContext, useState, type PropsWithChildren } from 'react';

interface Alert {
  hidden: boolean;
  titleTranslationKey: string | null;
  description: string | null;
}

export interface DisplayAlert {
  titleTranslationKey: string | null;
  description: string | null;
}

interface AlertContextInterface {
  alert: Alert;
  displayAlert: (value: DisplayAlert) => void; // eslint-disable-line no-unused-vars
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextInterface | undefined>(undefined);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const initValue = {
    hidden: true,
    titleTranslationKey: null,
    description: null,
  };

  const displayTime = 10 * 1000; // 10 seconds
  const [alert, setAlert] = useState<Alert>(initValue);

  function displayAlert(newAlert: DisplayAlert) {
    setAlert({
      hidden: false,
      titleTranslationKey: newAlert.titleTranslationKey,
      description: newAlert.description,
    });

    setTimeout(() => {
      if (!alert.hidden) {
        setAlert(initValue);
      }
    }, displayTime);
  }

  function hideAlert() {
    setAlert(initValue);
  }

  return <AlertContext.Provider value={{ alert, displayAlert, hideAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;
