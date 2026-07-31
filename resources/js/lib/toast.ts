// resources/js/lib/toast.ts
export function showToast(message: string, type: 'success' | 'error' = 'success', duration = 5000) {
    window.dispatchEvent(
        new CustomEvent('app-toast', { detail: { message, type, duration } })
    );
}
