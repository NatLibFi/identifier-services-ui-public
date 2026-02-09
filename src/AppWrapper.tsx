import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@/App';

const queryClient = new QueryClient();
const unexpectedCrashMessage =
  'Ohjelmisto kohtasi odottamattoman virheen. Ole hyvä ja yritä hetken kuluttua uudelleen. Tarvittaessa ota yhteyttä asiakaspalveluun sähköpostilla isbn-keskus@helsinki.fi';

const AppWrapper = () => {
  const [runtimeConfig, setRuntimeConfig] = useState({
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let ignoreUseEffect = false;

    if (!runtimeConfig.loading || runtimeConfig.error || ignoreUseEffect) {
      return;
    }

    fetchRuntimeConfig();
    return () => {
      ignoreUseEffect = true;
      return;
    };

    async function fetchRuntimeConfig() {
      try {
        const response = await fetch('/config', {
          headers: { accept: 'application/json' },
        });

        if (!response.ok) {
          return setRuntimeConfig({ data: null, loading: false, error: true });
        }

        const data = await response.json();
        return setRuntimeConfig({ data, loading: false, error: false });
      } catch (error) {
        console.error('Fetching runtime config failed due to an error: ', error);
        return setRuntimeConfig({ data: null, loading: false, error: true });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (runtimeConfig.loading) {
    return null;
  }

  if (runtimeConfig.error || runtimeConfig.data === null) {
    return <p>{unexpectedCrashMessage}</p>;
  }

  return (
    <ErrorBoundary fallback={<p>{unexpectedCrashMessage}</p>}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App runtimeConfig={runtimeConfig.data} />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default AppWrapper;
