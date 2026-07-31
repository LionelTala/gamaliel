<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Formation;
use App\Models\Certification;
use App\Models\Vague;
use App\Models\Candidature;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ============================================
        // STATISTIQUES GLOBALES
        // ============================================
        $stats = [
            'total_students' => Student::count(),
            'total_formations' => Formation::count(),
            'total_certifications' => Certification::count(),
            'total_vagues' => Vague::count(),
            'total_candidatures' => Candidature::count(),
            'total_admins' => User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])->count(),
            'candidatures_en_attente' => Candidature::where('statut', 'en_attente')->count(),
            'candidatures_admis' => Candidature::where('statut', 'admis')->count(),
            'etudiants_online' => Student::whereNotNull('vague_id')->count(),
            'etudiants_certification' => Student::whereNotNull('certification_id')->count(),
        ];

        // ============================================
        // INSCRIPTIONS MENSUELLES (12 derniers mois)
        // ============================================
        $monthlyStats = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthlyStats[] = [
                'month' => $date->format('M Y'),
                'students' => Student::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
                'candidatures' => Candidature::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        }

        // ============================================
        // TOP 5 FORMATIONS (par nombre d'étudiants)
        // ============================================
        $topFormations = Formation::withCount('vagues as etudiants_count')
    ->orderBy('etudiants_count', 'desc')
    ->limit(5)
    ->get()
    ->map(function ($formation) {
        // Compter les étudiants via les vagues
        $count = Student::whereIn('vague_id', $formation->vagues->pluck('id'))->count();
        return [
            'name' => $formation->name,
            'count' => $count,
            'abbreviation' => $formation->abbreviation,
        ];
    });


        // ============================================
        // RÉPARTITION DES ÉTUDIANTS PAR TYPE
        // ============================================
        $repartition = [
            'En ligne' => Student::whereNotNull('vague_id')->count(),
            'Certification' => Student::whereNotNull('certification_id')->count(),
            'Non affectés' => Student::whereNull('vague_id')->whereNull('certification_id')->count(),
        ];

        // ============================================
        // DERNIÈRES ACTIVITÉS
        // ============================================
        $recentActivities = collect();

        // Dernières candidatures
        $recentCandidatures = Candidature::with(['formation', 'certification'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($c) {
                return [
                    'type' => 'candidature',
                    'message' => "Nouvelle candidature de {$c->nom_complet}",
                    'detail' => $c->formation?->name ?? $c->certification?->titre ?? 'Formation',
                    'statut' => $c->statut,
                    'created_at' => $c->created_at->diffForHumans(),
                    'link' => "/admin/candidatures/{$c->id}",
                ];
            });

        // Derniers étudiants inscrits
        $recentStudents = Student::with(['user', 'vague', 'certification'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($s) {
                return [
                    'type' => 'student',
                    'message' => "Nouvel étudiant : {$s->full_name}",
                    'detail' => $s->vague?->name ?? $s->certification?->titre ?? 'Non affecté',
                    'statut' => $s->isActive() ? 'Actif' : 'Inactif',
                    'created_at' => $s->created_at->diffForHumans(),
                    'link' => "/admin/students/{$s->id}",
                ];
            });

        $recentActivities = $recentCandidatures
            ->concat($recentStudents)
            ->sortByDesc('created_at')
            ->take(15)
            ->values();

        // ============================================
        // TENDANCES (évolution des inscriptions)
        // ============================================
        $tendance = [
            'mois_dernier' => Student::whereBetween('created_at', [
                Carbon::now()->subMonth()->startOfMonth(),
                Carbon::now()->subMonth()->endOfMonth(),
            ])->count(),
            'mois_actuel' => Student::whereBetween('created_at', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth(),
            ])->count(),
        ];

        $tendance['variation'] = $tendance['mois_dernier'] > 0
            ? round((($tendance['mois_actuel'] - $tendance['mois_dernier']) / $tendance['mois_dernier']) * 100, 1)
            : 0;

        // ============================================
        // STATUT DES VAGUES
        // ============================================
        $vaguesStats = [
            'en_cours' => Vague::where('is_active', true)
                ->where('date_debut', '<=', now())
                ->where('date_fin', '>=', now())
                ->count(),
            'a_venir' => Vague::where('date_debut', '>', now())->count(),
            'terminees' => Vague::where('date_fin', '<', now())->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'monthlyStats' => $monthlyStats,
            'topFormations' => $topFormations,
            'repartition' => $repartition,
            'recentActivities' => $recentActivities,
            'tendance' => $tendance,
            'vaguesStats' => $vaguesStats,
        ]);
    }
}
