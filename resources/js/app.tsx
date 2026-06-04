import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ) as Promise<any>,

  setup({ el, App, props }) {
    const content = (
      <>
        <App {...props} />
        <Toaster richColors position="top-center" closeButton />
      </>
    );

    if (import.meta.env.SSR) {
      if (el) {
        hydrateRoot(el, content);
      }
      return;
    }

    if (!el) {
      console.error("Target container 'el' is not a DOM element.");
      return;
    }

    createRoot(el).render(content);
  },

  progress: {
    color: 'var(--primary)',
  },
});
