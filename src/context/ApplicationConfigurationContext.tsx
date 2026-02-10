import { createContext } from 'react';

import { type ApplicationConfiguration } from '@/App';

const ApplicationConfigurationContext = createContext<ApplicationConfiguration>({
  environment: 'development',
  turnstileSiteKey: '',
  maintenance: false,
  notificationBanner: {},
});
export default ApplicationConfigurationContext;
