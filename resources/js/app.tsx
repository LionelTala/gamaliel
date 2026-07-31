import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/Components/UI/ErrorBoundary';

import ToastContainer from '@/Components/UI/ToastContainer';

import type { Auth, Flash } from './types';
import PageLoader from './Components/UI/PageLoader';

const appName = import.meta.env.VITE_APP_NAME || 'CAB Informatique';

declare module '@inertiajs/react' {
    export interface PageProps {
        auth: Auth;
        flash: Flash;
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')).then(
            (module: any) => {
                const page = module.default;
                const existingLayout = page.layout;
                page.layout = (pageContent: React.ReactNode) => (
                    <>
                        {existingLayout ? existingLayout(pageContent) : pageContent}
                        <ToastContainer />
                    </>
                );
                return module;
            }
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ErrorBoundary>
                <App {...props} />
                <PageLoader></PageLoader>
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#1A56DB',
     },
});

