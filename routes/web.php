<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\CoursController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\FormationController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VagueController;
use App\Http\Controllers\Public\CandidatureController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\CoursController  as StudentCoursController;
use App\Http\Controllers\Admin\DevoirController as AdminDevoirController;
use App\Http\Controllers\Student\DevoirController as StudentDevoirController;
use App\Http\Controllers\Admin\EvaluationController as AdminEvaluationController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\EvaluationController as StudentEvaluationController;
use App\Http\Controllers\Admin\GalerieController;
use App\Http\Controllers\Public\GalerieController as PublicGalerieController;
use App\Http\Controllers\Admin\ActiviteController;
use App\Http\Controllers\Admin\LessonController;
use App\Http\Controllers\Admin\LivreController;
use App\Http\Controllers\Admin\PaiementController;
use App\Http\Controllers\Admin\PreInscriptionController;
use App\Http\Controllers\Admin\TrancheController;
use App\Http\Controllers\Admin\VisitStatsController;
use App\Http\Controllers\Public\ActiviteController as PublicActiviteController;
use App\Http\Controllers\Public\BibliothequeController;
use App\Http\Controllers\Student\VideoStreamController;
use App\Http\Controllers\Admin\VideoStreamController as AdminVideoStreamController;



 Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/formations', [App\Http\Controllers\Public\FormationController::class, 'index'])->name('formations.public');
Route::get('/certification', [App\Http\Controllers\Public\CertificationController::class, 'index'])->name('certification.public');
Route::get('/preinscription', [CandidatureController::class, 'create'])->name('candidature.create');
Route::post('/candidatures', [CandidatureController::class, 'store'])->name('candidature.store');
Route::get('/candidature/success', [CandidatureController::class, 'success'])->name('candidature.success');
Route::get('/galerie', [PublicGalerieController::class, 'index'])->name('galerie.public');
Route::get('/activites', [PublicActiviteController::class, 'index'])->name('activites.public');
Route::get('/bibliotheque', [BibliothequeController::class, 'index'])->name('public.bibliotheque');
Route::post('/pre-inscription', [App\Http\Controllers\Public\PreInscriptionController::class, 'store'])->name('pre-inscription.store');



     Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// Route for admin dashboard
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/stats-visites', [VisitStatsController::class, 'index'])->name('stats.visites');


    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit'); // ⬅️ à ajouter
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update'); // ⬅️ à ajouter
    Route::post('users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

Route::get('/formations', [FormationController::class, 'index'])->name('formations.index');
Route::get('/formations/create', [FormationController::class, 'create'])->name('formations.create');
Route::get('/formations/create-presentiel', [FormationController::class, 'createPresentiel'])->name('formations.create-presentiel');
Route::post('/formations', [FormationController::class, 'store'])->name('formations.store');
Route::get('/formations/{id}/edit', [FormationController::class, 'edit'])->name('formations.edit');
Route::get('/formations/{id}/edit-presentiel', [FormationController::class, 'editPresentiel'])->name('formations.edit-presentiel');
Route::match(['post', 'put'], '/formations/{id}', [FormationController::class, 'update'])->name('formations.update');
Route::delete('/formations/{id}', [FormationController::class, 'destroy'])->name('formations.destroy');
Route::post('/formations/{id}/toggle-active', [FormationController::class, 'toggleActive'])->name('formations.toggle-active');
    // routes/web.php - Ajouter dans le groupe admin
    Route::resource('/certifications', CertificationController::class);
    Route::post('/certifications/{certification}/toggle-active', [CertificationController::class, 'toggleActive'])->name('certifications.toggle-active');
    Route::resource('/vagues', VagueController::class);
    Route::post('/vagues/{vague}/toggle-active', [VagueController::class, 'toggleActive'])->name('vagues.toggle-active');

    // <-------- Candidature routes for admin

    // Candidatures
    Route::get('/candidatures', [App\Http\Controllers\Admin\CandidatureController::class, 'index'])->name('candidatures.index');
    Route::get('/candidatures/{candidature}', [App\Http\Controllers\Admin\CandidatureController::class, 'show'])->name('candidatures.show');
    Route::post('/candidatures/{candidature}/accepter', [App\Http\Controllers\Admin\CandidatureController::class, 'accepter'])->name('candidatures.accepter');
    Route::post('/candidatures/{candidature}/refuser', [App\Http\Controllers\Admin\CandidatureController::class, 'refuser'])->name('candidatures.refuser');
    Route::post('/candidatures/{candidature}/en-cours', [App\Http\Controllers\Admin\CandidatureController::class, 'mettreEnCours'])->name('candidatures.en-cours');
    Route::post('/candidatures/{candidature}/attribuer-vague', [App\Http\Controllers\Admin\CandidatureController::class, 'attribuerVague'])->name('candidatures.attribuer-vague');

    // student management
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
Route::post('/students/{student}/toggle-active', [StudentController::class, 'toggleActive'])->name('students.toggle-active');
Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
Route::get('/students/vagues/{formationId}', [StudentController::class, 'getVaguesByFormation'])->name('students.vagues');
Route::get('/students/certifications/{formationId}', [StudentController::class, 'getCertificationsByFormation'])->name('students.certifications');


    // course management
Route::get('/cours/vagues/{formationId}', [CoursController::class, 'getVaguesByFormation'])->name('cours.vagues');
    Route::get('/cours/certifications/{formationId}', [CoursController::class, 'getCertificationsByFormation'])->name('cours.certifications');
    Route::get('/cours/students-by-certification/{certificationId}', [CoursController::class, 'getStudentsByCertification'])->name('cours.students-by-certification');

    // 2. Actions CRUD standards du cours (Déclarées explicitement)
    Route::get('/cours', [CoursController::class, 'index'])->name('cours.index');
    Route::get('/cours/create', [CoursController::class, 'create'])->name('cours.create');
    Route::post('/cours', [CoursController::class, 'store'])->name('cours.store');
    Route::get('/cours/{cours}', [CoursController::class, 'show'])->name('cours.show');
    Route::get('/cours/{cours}/edit', [CoursController::class, 'edit'])->name('cours.edit');

    // 🚀 LA ROUTE DE MISE À JOUR : Elle doit être en POST et correspondre à /admin/cours/{cours}
    Route::match(['post','put'],'/cours/{cours}', [CoursController::class, 'update'])->name('cours.update');

    Route::delete('/cours/{cours}', [CoursController::class, 'destroy'])->name('cours.destroy');

    // 3. Actions personnalisées
    Route::post('/cours/{cours}/toggle-active', [CoursController::class, 'toggleActive'])->name('cours.toggle-active');

    // devoir management
    // routes/web.php - Dans le groupe admin

// ============================================
// DEVOIRS - Routes AJAX (API)
// ============================================
Route::get('/devoirs/vagues/{formationId}', [AdminDevoirController::class, 'getVaguesByFormation'])->name('devoirs.vagues');
Route::get('/devoirs/certifications/{formationId}', [AdminDevoirController::class, 'getCertificationsByFormation'])->name('devoirs.certifications');
Route::get('/devoirs/students-by-certification/{certificationId}', [AdminDevoirController::class, 'getStudentsByCertification'])->name('devoirs.students-by-certification');
Route::get('/devoirs/tranches/{formationId}', [AdminDevoirController::class, 'getTranchesByFormation'])->name('devoirs.tranches');

// ============================================
// DEVOIRS - Routes CRUD (explicites)
// ============================================
Route::get('/devoirs', [AdminDevoirController::class, 'index'])->name('devoirs.index');
Route::get('/devoirs/create', [AdminDevoirController::class, 'create'])->name('devoirs.create');
Route::post('/devoirs', [AdminDevoirController::class, 'store'])->name('devoirs.store');
Route::get('/devoirs/{devoir}', [AdminDevoirController::class, 'show'])->name('devoirs.show');
Route::get('/devoirs/{devoir}/edit', [AdminDevoirController::class, 'edit'])->name('devoirs.edit');

// ✅ Route de mise à jour en POST pour multipart/form-data
Route::match(['post', 'put'], '/devoirs/{devoir}', [AdminDevoirController::class, 'update'])->name('devoirs.update');

Route::delete('/devoirs/{devoir}', [AdminDevoirController::class, 'destroy'])->name('devoirs.destroy');

// ============================================
// DEVOIRS - Actions personnalisées
// ============================================
Route::post('/devoirs/{devoir}/toggle-active', [AdminDevoirController::class, 'toggleActive'])->name('devoirs.toggle-active');
Route::post('/devoirs/{devoir}/resend-notifications', [AdminDevoirController::class, 'resendNotifications'])->name('devoirs.resend-notifications');
Route::post('/soumissions/{soumission}/corriger', [AdminDevoirController::class, 'corriger'])->name('soumissions.corriger');

    // evaluation management
     // routes/web.php - Dans le groupe admin

// ============================================
// EVALUATIONS - Routes AJAX (API)
// ============================================
Route::get('/evaluations/vagues/{formationId}', [AdminEvaluationController::class, 'getVaguesByFormation'])->name('evaluations.vagues');
Route::get('/evaluations/certifications/{formationId}', [AdminEvaluationController::class, 'getCertificationsByFormation'])->name('evaluations.certifications');
Route::get('/evaluations/students-by-certification/{certificationId}', [AdminEvaluationController::class, 'getStudentsByCertification'])->name('evaluations.students-by-certification');
Route::get('/evaluations/tranches/{formationId}', [AdminEvaluationController::class, 'getTranchesByFormation'])->name('evaluations.tranches');

// ============================================
// EVALUATIONS - Routes CRUD (explicites)
// ============================================
Route::get('/evaluations', [AdminEvaluationController::class, 'index'])->name('evaluations.index');
Route::get('/evaluations/create', [AdminEvaluationController::class, 'create'])->name('evaluations.create');
Route::post('/evaluations', [AdminEvaluationController::class, 'store'])->name('evaluations.store');
Route::get('/evaluations/{evaluation}', [AdminEvaluationController::class, 'show'])->name('evaluations.show');
Route::get('/evaluations/{evaluation}/edit', [AdminEvaluationController::class, 'edit'])->name('evaluations.edit');

// ✅ Route de mise à jour en POST pour multipart/form-data
Route::match(['post', 'put'], '/evaluations/{evaluation}', [AdminEvaluationController::class, 'update'])->name('evaluations.update');

Route::delete('/evaluations/{evaluation}', [AdminEvaluationController::class, 'destroy'])->name('evaluations.destroy');

// ============================================
// EVALUATIONS - Actions personnalisées
// ============================================
Route::post('/evaluations/{evaluation}/toggle-active', [AdminEvaluationController::class, 'toggleActive'])->name('evaluations.toggle-active');
Route::post('/evaluations/{evaluation}/resend-notifications', [AdminEvaluationController::class, 'resendNotifications'])->name('evaluations.resend-notifications');
Route::post('/soumissions-evaluations/{soumission}/corriger', [AdminEvaluationController::class, 'corriger'])->name('soumissions-evaluations.corriger');



    Route::get('/galerie', [GalerieController::class, 'index'])->name('galerie.index');
Route::get('/galerie/create', [GalerieController::class, 'create'])->name('galerie.create');
Route::post('/galerie', [GalerieController::class, 'store'])->name('galerie.store');
Route::get('/galerie/{galerie}/edit', [GalerieController::class, 'edit'])->name('galerie.edit');

// ✅ Route de mise à jour en POST pour multipart/form-data
Route::match(['post', 'put'], '/galerie/{galerie}', [GalerieController::class, 'update'])->name('galerie.update');

Route::delete('/galerie/{galerie}', [GalerieController::class, 'destroy'])->name('galerie.destroy');
Route::post('/galerie/{galerie}/toggle-active', [GalerieController::class, 'toggleActive'])->name('galerie.toggle-active');


    Route::resource('/activites', ActiviteController::class);
    Route::post('/activites/{activite}/toggle-active', [ActiviteController::class, 'toggleActive'])->name('activites.toggle-active');

        // ------------- Livres -------------------
    Route::get('/bibliotheque', [LivreController::class, 'index'])->name('bibliotheque.index');
    Route::get('/bibliotheque/create', [LivreController::class, 'create'])->name('bibliotheque.create');
    Route::post('/bibliotheque', [LivreController::class, 'store'])->name('bibliotheque.store');
    Route::get('/bibliotheque/{livre}/edit', [LivreController::class, 'edit'])->name('bibliotheque.edit');
    Route::match(['post', 'put'], '/bibliotheque/{livre}', [LivreController::class, 'update'])->name('bibliotheque.update');
    Route::delete('/bibliotheque/{livre}', [LivreController::class, 'destroy'])->name('bibliotheque.destroy');
    Route::patch('/bibliotheque/{livre}/toggle', [LivreController::class, 'toggle'])->name('bibliotheque.toggle');



    // Tranches (config par formation)
    Route::get('tranches', [TrancheController::class, 'index'])->name('tranches.index');
    Route::get('tranches/create', [TrancheController::class, 'create'])->name('tranches.create');
    Route::post('tranches', [TrancheController::class, 'store'])->name('tranches.store');
    Route::get('tranches/{tranche}/edit', [TrancheController::class, 'edit'])->name('tranches.edit');
    Route::put('tranches/{tranche}', [TrancheController::class, 'update'])->name('tranches.update');
    Route::delete('tranches/{tranche}', [TrancheController::class, 'destroy'])->name('tranches.destroy');

    // ✅ Route pour récupérer les tranches par formation (AJAX)
    Route::get('tranches/by-formation/{formationId}', [TrancheController::class, 'getByFormation'])
        ->name('tranches.by-formation');

    Route::put('formations/{formation}/lien-paiement-total', [TrancheController::class, 'updateLienTotal'])->name('formations.lien-total');

    // Paiements (validation manuelle)
    Route::get('paiements', [PaiementController::class, 'index'])->name('paiements.index');
    Route::get('paiements/create', [PaiementController::class, 'create'])->name('paiements.create'); // ✅ Ajout
    Route::post('paiements', [PaiementController::class, 'store'])->name('paiements.store'); // ✅ Ajout
    Route::get('paiements/{paiement}/edit', [PaiementController::class, 'edit'])->name('paiements.edit'); // ✅ Ajout
    Route::put('paiements/{paiement}', [PaiementController::class, 'update'])->name('paiements.update'); // ✅ Ajout
    Route::post('paiements/{student}/{tranche}/confirmer', [PaiementController::class, 'confirmer'])->name('paiements.confirmer');
    Route::delete('paiements/{student}/{tranche}/annuler', [PaiementController::class, 'annuler'])->name('paiements.annuler');



    // Pre inscription
    Route::get('/pre-inscriptions', [PreInscriptionController::class, 'index'])->name('pre-inscriptions.index');
Route::put('/pre-inscriptions/{preInscription}', [PreInscriptionController::class, 'update'])->name('pre-inscriptions.update');
Route::delete('/pre-inscriptions/{preInscription}', [PreInscriptionController::class, 'destroy'])->name('pre-inscriptions.destroy');


 // lecon

Route::post('/cours/{cours}/lessons', [LessonController::class, 'store'])->name('lessons.store');

// Détails d'une leçon
Route::get('/cours/lesson/{lesson}', [LessonController::class, 'show'])->name('lessons.show');

// Édition d'une leçon
Route::get('/cours/lesson/{lesson}/edit', [LessonController::class, 'edit'])->name('lessons.edit');

// Mise à jour d'une leçon (POST pour multipart/form-data)
Route::match(['post', 'put'], '/cours/lesson/{lesson}', [LessonController::class, 'update'])->name('lessons.update');

// Suppression d'une leçon
Route::delete('/cours/lesson/{lesson}', [LessonController::class, 'destroy'])->name('lessons.destroy');

// Activer/Désactiver une leçon
Route::post('/cours/lesson/{lesson}/toggle-active', [LessonController::class, 'toggleActive'])->name('lessons.toggle-active');



// // ✅ CORRECT : Doit pointer vers Admin\VideoStreamController
//     Route::get('/cours/{cours}/stream-video', [AdminVideoStreamController::class, 'streamCours'])->name('video.stream.cours');
//     Route::get('/lessons/{lesson}/stream-video', [AdminVideoStreamController::class, 'streamLesson'])->name('video.stream.lesson');


});



// Route for student dashboard
Route::middleware(['auth', 'student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentDashboardController::class, 'index'])->name('dashboard');
       Route::get('/cours', [StudentCoursController::class, 'index'])->name('cours.index');
       Route::get('/cours/{cours}', [StudentCoursController::class, 'show'])->name('cours.show');

       Route::get('/cours/lesson/{lesson}', [StudentCoursController::class, 'showLesson'])->name('cours.lesson.show');
    Route::post('/cours/lesson/{lesson}/view', [StudentCoursController::class, 'markLessonAsViewed'])->name('cours.lesson.view');

    // Marquer un cours comme vu
    Route::post('/cours/{cours}/view', [StudentCoursController::class, 'markAsViewed'])->name('cours.view');

    // devoir management
    Route::get('/devoirs', [StudentDevoirController::class, 'index'])->name('devoirs');
    Route::get('/devoirs/{devoir}', [StudentDevoirController::class, 'show'])->name('devoirs.show');
    Route::post('/devoirs/{devoir}/soumettre', [StudentDevoirController::class, 'soumettre'])->name('devoirs.soumettre');

    // evaluation management
    Route::get('/evaluations', [StudentEvaluationController::class, 'index'])->name('evaluations');
    Route::get('/evaluations/{evaluation}', [StudentEvaluationController::class, 'show'])->name('evaluations.show');
    Route::post('/evaluations/{evaluation}/soumettre', [StudentEvaluationController::class, 'soumettre'])->name('evaluations.soumettre');




 });

 Route::middleware('auth')->prefix('notifications')->name('notifications.')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('index');
    Route::post('/{id}/read', [NotificationController::class, 'markAsRead'])->name('read');
    Route::post('/read-all', [NotificationController::class, 'markAllAsRead'])->name('read-all');



});
Route::middleware(['auth'])->group(function () {
    Route::get('/profil', [ProfileController::class, 'index'])->name('profil');
    Route::post('/profil', [ProfileController::class, 'update'])->name('profil.update');

    Route::get('/stream/cours/{cours}', [VideoStreamController::class, 'streamCours'])
        ->name('video.stream.cours');
    Route::get('/stream/lesson/{lesson}', [VideoStreamController::class, 'streamLesson'])
        ->name('video.stream.lesson');

    Route::get('/admin/stream/cours/{cours}', [AdminVideoStreamController::class, 'streamCours'])
        ->name('admin.video.stream.cours');
    Route::get('/admin/stream/lesson/{lesson}', [AdminVideoStreamController::class, 'streamLesson'])
        ->name('admin.video.stream.lesson');
});
