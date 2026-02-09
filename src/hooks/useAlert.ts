import { useContext } from 'react';

import AlertContext from '@/context/AlertContext';

function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('Alert context is undefined but is required to be defined!');
  }

  return context;
}

export default useAlert;
