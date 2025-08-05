// File: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  QueryClientProvider,
} from '@tanstack/react-query';
import './index.css'; // your Tailwind or global styles
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';
import { SpeedInsights } from "@vercel/speed-insights/next"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
      <SpeedInsights />
    </QueryClientProvider>
  </React.StrictMode>
);
