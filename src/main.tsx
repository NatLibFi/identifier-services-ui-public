import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppWrapper from '@/AppWrapper.tsx';
import '@/index.css';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
