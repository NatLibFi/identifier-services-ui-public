import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import MainLayout from '@/layouts/MainLayout.tsx';

import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';

// Lazy-load pages to reduce bundle size

// Utility pages
const MaintenancePage = lazy(() => import('@/pages/MaintenancePage.tsx'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.tsx'));

// Policy pages
const AccessibilityStatementPage = lazy(() => import('@/pages/AccessibilityStatementPage.tsx'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));

// Main pages
const HomePage = lazy(() => import('@/pages/HomePage.tsx'));
const IdentifierBatchDownloadPage = lazy(() => import('@/pages/IdentifierBatchDownloadPage'));
const MonographPublisherSearchPage = lazy(() => import('@/pages/MonographPublisherSearchPage'));
const MonographPublisherPage = lazy(() => import('@/pages/MonographPublisherPage'));

// Forms
const FormSuccessPage = lazy(() => import('@/pages/forms/FormSuccessPage'));
const MonographPublishersForm = lazy(() => import('@/pages/forms/MonographPublishersForm'));
const MonographPublicationsForm = lazy(() => import('@/pages/forms/MonographPublicationsForm'));
const SerialPublicationsForm = lazy(() => import('@/pages/forms/SerialPublicationsForm'));

function ApplicationRoutes() {
  const { isMaintenance } = useApplicationConfiguration();

  // All routes return maintenance page during maintenance period
  if (isMaintenance) {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={<MaintenancePage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Main pages */}
        <Route index element={<HomePage />} />
        <Route path="/monograph-publishers" element={<MonographPublisherSearchPage />} />
        <Route path="/monograph-publishers/:monographPublisherId" element={<MonographPublisherPage />} />
        <Route path="/isbn-registry/publishers" element={<Navigate replace to="/monograph-publishers" />} />

        {/* Note: at this point v1 route prefix is used to maintain link integrity without need to redirect */}
        <Route path="/isbn-registry/identifierbatches/:identifierBatchId" element={<IdentifierBatchDownloadPage />} />

        {/* Policy pages */}
        <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* Forms */}
        <Route path="/form-success" element={<FormSuccessPage />} />

        <Route path="/forms/monograph-publishers" element={<MonographPublishersForm />} />
        <Route path="/forms/isbn-ismn-publisher" element={<Navigate replace to="/forms/monograph-publishers" />} />

        <Route path="/forms/monograph-publications" element={<MonographPublicationsForm />} />
        <Route path="/forms/isbn-ismn-publication" element={<Navigate replace to="/forms/monograph-publications" />} />

        <Route path="/forms/serial-publications" element={<SerialPublicationsForm />} />
        <Route path="/forms/issn-publication" element={<Navigate replace to="/forms/serial-publications" />} />

        {/* Not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default ApplicationRoutes;
