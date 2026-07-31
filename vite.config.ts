// vite.config.ts
import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';
import oklabFunction from '@csstools/postcss-oklab-function';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    build: {
        // Transpile pour rester compatible avec d'anciens navigateurs
        // (Safari 15 / iPhone 7, très courant au Cameroun)
        target: 'es2019',
    },
    css: {
        postcss: {
            plugins: [
                // Ajoute un fallback rgb() avant chaque couleur oklch()
                // pour les navigateurs qui ne supportent pas oklch (Safari < 15.4)
                oklabFunction({ preserve: true }),
            ],
        },
    },
    // server: {
    //     host: '0.0.0.0', // Écoute sur toutes les interfaces
    //     port: 5173,
    //     hmr: {
    //         host: '172.20.10.13', // Remplace par ton IP locale
    //     },
    // },
});
