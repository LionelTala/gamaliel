<?php
 namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageVisit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitStatsController extends Controller
{
    protected array $labels = [
        '/' => 'Accueil',
        'formations' => 'Formations',
        'certification' => 'Certification',
        'galerie' => 'Galerie',
        'bibliotheque' => 'Bibliothèque',
    ];

    public function index(Request $request)
    {
        $period = $request->input('period', 'today'); // today | week | month | all

        $query = PageVisit::query();

        match ($period) {
            'today' => $query->whereDate('created_at', today()),
            'week' => $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]),
            'month' => $query->whereMonth('created_at', now()->month)->whereYear('created_at', now()->year),
            default => null, // 'all'
        };

        $perPage = (clone $query)
            ->selectRaw('path, count(*) as total, count(distinct session_id) as uniques')
            ->groupBy('path')
            ->get()
            ->map(fn ($row) => [
                'path' => $row->path,
                'label' => $this->labels[$row->path] ?? $row->path,
                'total' => $row->total,
                'uniques' => $row->uniques,
            ]);

        return Inertia::render('Admin/VisitStats', [
            'period' => $period,
            'totalVisits' => (clone $query)->count(),
            'totalUniques' => (clone $query)->distinct('session_id')->count('session_id'),
            'perPage' => $perPage,
        ]);
    }
}
