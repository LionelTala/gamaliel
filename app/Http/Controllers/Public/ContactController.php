<?php
namespace App\Http\Controllers\Public;

use App\Events\NotificationCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use App\Models\Notification;
use App\Models\User;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('public/Contact');
    }

    public function store(StoreContactRequest $request)
    {
        $contact = Contact::create([
            ...$request->validated(),
            'ip_address' => $request->ip(),
        ]);

        $this->notifyAdmins($contact);

        return back()->with('success', 'Votre message a bien été envoyé. Nous vous répondrons rapidement.');
    }

    /**
     * Crée une notification "contact" pour chaque admin habilité et diffuse
     * l'event en temps réel (canal privé user.{id}), pour que le badge de
     * l'AdminLayout se mette à jour sans rechargement de page.
     */
    private function notifyAdmins(Contact $contact): void
    {
        $admins = User::whereIn('role', ['super_admin', 'admin_centre'])->get();

        foreach ($admins as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'type' => 'contact',
                'title' => 'Nouveau message de contact',
                'message' => "{$contact->nom} a envoyé un message : \"{$this->excerpt($contact->message)}\"",
                'link' => '/admin/contacts',
                'data' => [
                    'contact_id' => $contact->id,
                    'nom' => $contact->nom,
                    'telephone' => $contact->telephone,
                ],
            ]);

            broadcast(new NotificationCreated($notification))->toOthers();
        }
    }

    private function excerpt(string $text, int $length = 60): string
    {
        return mb_strlen($text) > $length ? mb_substr($text, 0, $length) . '…' : $text;
    }
}