declare module 'react';
declare module 'react-dom/client';
declare module 'framer-motion';
declare module '@heroicons/react/24/solid';
declare module 'date-fns';
declare module 'react-day-picker';
declare module 'react/jsx-runtime';

// Minimal JSX support
export {}; // ensure this file is a module

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
