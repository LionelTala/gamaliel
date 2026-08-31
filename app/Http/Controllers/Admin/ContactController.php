<?php

// app/Http/Controllers/Admin/ContactController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::orderByDesc('created_at')->paginate(20);

        return Inertia::render('Admin/Contacts', [
            'contacts' => $contacts,
        ]);
    }

    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);

        return back();
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return back()->with('success', 'Message supprimé.');
    }
}