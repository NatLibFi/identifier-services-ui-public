import { Outlet } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorDisplay from '@/components/ErrorDisplay';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Navbar from '@/components/navbar/Navbar';
import AlertBanner from '@/components/AlertBanner';
import TestEnvironmentHeader from '@/components/TestEnvironmentHeader';
import NotificationBanner from '@/components/NotificationBanner';

function MainLayout() {
  return (
    <div id="main-container" className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <TestEnvironmentHeader />
      <NotificationBanner />
      <AlertBanner />

      <Header />
      <Navbar />

      <main className="flex flex-row flex-auto min-h-[100vh] md:min-h-[50vh]">
        <ErrorBoundary fallback={<ErrorDisplay />}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
