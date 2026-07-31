export type * from './auth';
export type { AuthUser as User };


export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: 'super_admin' | 'admin_centre' | 'admin' | 'student_online' | 'student_certif';
    is_active: boolean;
    last_login_at: string | null;
}

// export interface Auth {
//     user: User | null;
// }

// export interface Flash {
//     success: string | null;
//     error: string | null;
//     warning: string | null;
//     info: string | null;
// }

// // export interface PageProps {
//     auth: Auth;
//     flash: Flash;
// }

export interface SharedPageProps {
    auth?: {
        user?: AuthUser | null;
    };
    unreadNotificationsCount: number;
    unreadCountsByType: Record<string, number>;
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}

// Garde ton export existant `User` s'il y en a un déjà utilisé ailleurs
