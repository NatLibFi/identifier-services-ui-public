import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';

function TestEnvironmentHeader() {
  const { isProductionEnvironment } = useApplicationConfiguration();

  if (isProductionEnvironment) {
    return null;
  }

  return (
    <div id="test-env-header" className="text-center min-h-[2vh] text-white bg-fuchsia-700">
      TESTIYMPÄRISTÖ / TEST ENVIRONMENT
    </div>
  );
}

export default TestEnvironmentHeader;
