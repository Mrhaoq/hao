import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomeApp } from './App';
import '../shared/shell/shell.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeApp />
  </StrictMode>
);
