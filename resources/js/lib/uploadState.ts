// src/lib/uploadState.ts
export const uploadState = {
    active: false,
    setActive(status: boolean) {
        this.active = status;
        // Dispatch un événement personnalisé que le loader va écouter en temps réel
        window.dispatchEvent(new CustomEvent('upload-state-change', { detail: status }));
    }
};
