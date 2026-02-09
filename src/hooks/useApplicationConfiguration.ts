import { useContext } from 'react';

import ENVIRONMENTS from '@/constants/environments';

import ApplicationConfigurationContext from '@/context/ApplicationConfigurationContext';

function useApplicationConfiguration() {
  const { environment, maintenance, notificationBanner, turnstileSiteKey } = useContext(
    ApplicationConfigurationContext,
  );

  const isProductionEnvironment = environment === ENVIRONMENTS.production;

  const isProductionLikeEnvironment = () => {
    if (!environment) {
      return false;
    }

    return [ENVIRONMENTS.production, ENVIRONMENTS.staging].includes(environment);
  };

  return {
    notificationBanner: notificationBanner,
    isMaintenance: maintenance,
    isProductionEnvironment,
    isProductionLikeEnvironment: isProductionLikeEnvironment(),
    turnstileSiteKey,
  };
}

export default useApplicationConfiguration;
