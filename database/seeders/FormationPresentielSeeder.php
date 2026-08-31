<?php

namespace Database\Seeders;

use App\Models\FormationPresentiel;
use App\Models\Pole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; //test 


class FormationPresentielSeeder extends Seeder
{
    public function run(): void
    {
        // On résout les pôles une seule fois par slug, pour éviter une requête par formation
        $poles = Pole::pluck('id', 'slug');

        $formations = [
            // ============================================
            // TECHNIQUES ADMINISTRATIVES ET COMPTABLES
            // ============================================
            [
                'title' => 'Secrétariat Bureautique',
                'abbreviation' => 'SEC',
                'pole' => 'gestion',
                'description' => 'Accueil, classement, correspondance et communication digitale pour devenir l\'assistant(e) indispensable de toute entreprise.',
                'niveau_requis' => '4ème / BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 150000,
                'image' => 'bureau.webp',
                'icon' => '📋',
                'tags' => ['4ème / BEPC / GCE O Level'],
                'debouches' => [
                    'Secrétaire',
                    'Assistant(e) de direction',
                    'Standardiste',
                    'Gestionnaire de business center',
                    'Réceptionniste caissière',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Classement des dossiers',
                    'Gestion de la correspondance',
                    'Gestion du secrétariat et accueil',
                    'Économie et organisation des entreprises',
                    'Expression écrite et orale',
                    'Communication digitale',
                ],
                'ordre' => 1,
            ],
            [
                'title' => 'Secrétariat de Direction',
                'abbreviation' => 'SEC-DIR',
                'pole' => 'gestion',
                'description' => 'Une formation avancée pour piloter l\'agenda, la communication et l\'organisation d\'une direction d\'entreprise.',
                'niveau_requis' => 'Tous Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'secretariat-direction.webp',
                'icon' => '🗂️',
                'tags' => ['Tous Bac'],
                'debouches' => [
                    'Secrétaire de direction',
                    'Assistant(e) exécutif(ve)',
                    'Office manager',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Organisation et gestion de l\'agenda',
                    'Communication professionnelle avancée',
                    'Gestion administrative et archivage',
                    'Protocole et relations publiques',
                ],
                'ordre' => 2,
            ],
            [
                'title' => 'Secrétariat Comptable',
                'abbreviation' => 'SEC-CPT',
                'pole' => 'gestion',
                'description' => 'Comptabilité générale, fiscalité et états financiers SYSCOHADA pour piloter la gestion administrative d\'une entreprise.',
                'niveau_requis' => 'Probatoire / Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'comptable.webp',
                'icon' => '💰',
                'tags' => ['Probatoire / Bac'],
                'debouches' => [
                    'Aide-comptable',
                    'Secrétaire comptable',
                    'Secrétaire financière',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Comptabilité générale',
                    'Économie générale et EOE',
                    'Mathématiques financières',
                    'Comptabilité sur machine',
                    'Pratique du secrétariat',
                    'États financiers du SYSCOHADA',
                ],
                'ordre' => 3,
            ],
            [
                'title' => 'Comptabilité Informatisée',
                'abbreviation' => 'CPT-INF',
                'pole' => 'gestion',
                'description' => 'Tenue de comptes sur logiciels professionnels (Sage, ERP) pour répondre aux standards actuels des cabinets comptables.',
                'niveau_requis' => 'Tous Bac et +',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'comptabilite-informatisee.webp',
                'icon' => '🧮',
                'tags' => ['Tous Bac et +'],
                'debouches' => [
                    'Comptable',
                    'Assistant(e) comptable informatisé(e)',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Comptabilité générale et analytique',
                    'Logiciels comptables (Sage, ERP)',
                    'États financiers et déclarations',
                ],
                'ordre' => 4,
            ],
            [
                'title' => 'Fiscalité d\'Entreprise',
                'abbreviation' => 'FISC',
                'pole' => 'gestion',
                'description' => 'Maîtrise des obligations fiscales et déclarations d\'impôts pour accompagner la conformité des entreprises.',
                'niveau_requis' => 'Tous Bac et +',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'fiscalite.webp',
                'icon' => '📑',
                'tags' => ['Tous Bac et +'],
                'debouches' => [
                    'Assistant fiscal',
                    'Conseiller en fiscalité junior',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Système fiscal camerounais',
                    'Déclarations fiscales et sociales',
                    'Contentieux fiscal de base',
                ],
                'ordre' => 5,
            ],
            [
                'title' => 'Banque et Microfinance',
                'abbreviation' => 'BANK',
                'pole' => 'gestion',
                'description' => 'Techniques bancaires, gestion de portefeuille client et opérations de microfinance pour intégrer le secteur financier.',
                'niveau_requis' => 'Tous Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'banque-microfinance.webp',
                'icon' => '🏦',
                'tags' => ['Tous Bac'],
                'debouches' => [
                    'Agent de guichet',
                    'Chargé de clientèle junior',
                    'Agent de microfinance',
                ],
                'programme' => [
                    'Techniques bancaires de base',
                    'Produits de microfinance',
                    'Relation client et recouvrement',
                ],
                'ordre' => 6,
            ],

            // ============================================
            // PARAMÉDICALES
            // ============================================
            [
                'title' => 'Auxiliaire de Vie / Aide Soignant',
                'abbreviation' => 'AUX-VIE',
                'pole' => 'paramedical',
                'description' => 'Accompagnement des personnes fragiles ou malades, gestes de soins de base et relation d\'aide au quotidien.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'auxiliaire-vie.webp',
                'icon' => '🩺',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Auxiliaire de vie',
                    'Aide-soignant(e)',
                    'Accompagnant(e) à domicile',
                ],
                'programme' => [
                    'Gestes de soins de base',
                    'Hygiène et prévention',
                    'Accompagnement psychologique',
                ],
                'ordre' => 7,
            ],
            [
                'title' => 'Secrétariat Médical',
                'abbreviation' => 'SEC-MED',
                'pole' => 'paramedical',
                'description' => 'Accueil des patients, gestion des dossiers médicaux et terminologie médicale pour les cabinets et cliniques.',
                'niveau_requis' => 'Probatoire / Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'secretariat-medical.webp',
                'icon' => '🏥',
                'tags' => ['Probatoire / Bac'],
                'debouches' => [
                    'Secrétaire médical(e)',
                    'Assistant(e) de cabinet',
                    'Agent d\'accueil hospitalier',
                ],
                'programme' => [
                    'Terminologie médicale',
                    'Gestion des dossiers patients',
                    'Accueil et prise de rendez-vous',
                ],
                'ordre' => 8,
            ],
            [
                'title' => 'Vendeur en Pharmacie',
                'abbreviation' => 'PHARMA',
                'pole' => 'paramedical',
                'description' => 'Connaissance des produits pharmaceutiques, conseil client et gestion d\'officine pour travailler en pharmacie.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 250000,
                'image' => 'vendeur-pharmacie.webp',
                'icon' => '💊',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Vendeur(se) en pharmacie',
                    'Assistant(e) d\'officine',
                ],
                'programme' => [
                    'Notions de pharmacologie',
                    'Gestion d\'officine',
                    'Conseil et relation client',
                ],
                'ordre' => 9,
            ],
            [
                'title' => 'Assistant en Cabinet Médical',
                'abbreviation' => 'ASS-MED',
                'pole' => 'paramedical',
                'description' => 'Appui administratif et logistique aux praticiens dans un cabinet médical privé.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'assistant-cabinet-medical.webp',
                'icon' => '🩹',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Assistant(e) de cabinet médical',
                    'Agent d\'accueil clinique',
                ],
                'programme' => [
                    'Organisation d\'un cabinet médical',
                    'Assistance aux actes courants',
                    'Gestion des rendez-vous et dossiers',
                ],
                'ordre' => 10,
            ],
            [
                'title' => 'Délégué Médical',
                'abbreviation' => 'DEL-MED',
                'pole' => 'paramedical',
                'description' => 'Promotion de produits pharmaceutiques auprès des professionnels de santé, techniques de vente et réglementation du secteur.',
                'niveau_requis' => 'Bac+2',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 400000,
                'image' => 'delegue-medical.webp',
                'icon' => '💼',
                'tags' => ['Bac+2'],
                'debouches' => [
                    'Délégué(e) médical(e)',
                    'Attaché(e) commercial(e) pharmaceutique',
                ],
                'programme' => [
                    'Pharmacologie appliquée',
                    'Techniques de vente et négociation',
                    'Réglementation du médicament',
                ],
                'ordre' => 11,
            ],
            [
                'title' => 'Massothérapie',
                'abbreviation' => 'MASSO',
                'pole' => 'paramedical',
                'description' => 'Techniques de massage bien-être et thérapeutique pour exercer en institut, spa ou en libéral.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'massotherapie.webp',
                'icon' => '💆',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Masseur(se) professionnel(le)',
                    'Praticien(ne) en institut/spa',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Anatomie appliquée',
                    'Techniques de massage bien-être',
                    'Hygiène et posture professionnelle',
                ],
                'ordre' => 12,
            ],

            // ============================================
            // GÉNIE INFORMATIQUE
            // ============================================
            [
                'title' => 'Maintenance Informatique',
                'abbreviation' => 'MAINT',
                'pole' => 'informatique',
                'description' => 'Assemblage, dépannage et administration réseau pour devenir le technicien informatique que chaque entreprise recherche.',
                'niveau_requis' => 'BEPC / Probatoire / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'reseau.webp',
                'icon' => '🖥️',
                'tags' => ['BEPC / Probatoire / GCE O Level'],
                'debouches' => [
                    'Technicien en maintenance',
                    'Responsable S.A.V',
                    'Vendeur de matériel informatique',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Assemblage des ordinateurs',
                    'Architecture des ordinateurs',
                    'Réseaux et administration systèmes',
                    'Diagnostic et dépannage logiciel et matériel',
                ],
                'ordre' => 13,
            ],
            [
                'title' => 'Infographie',
                'abbreviation' => 'INFO',
                'pole' => 'informatique',
                'description' => 'Illustrator, Photoshop et InDesign pour créer des visuels et gérer une communication digitale professionnelle.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 250000,
                'image' => 'infographie.webp',
                'icon' => '🎨',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Graphiste digital',
                    'Web designer',
                    'Gestionnaire de médias sociaux',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Initiation au graphisme',
                    'Adobe Illustrator',
                    'Adobe Photoshop',
                    'Adobe InDesign',
                ],
                'ordre' => 14,
            ],
            [
                'title' => 'Graphisme de Production',
                'abbreviation' => 'GRAPH-PROD',
                'pole' => 'informatique',
                'description' => 'Chaîne graphique complète, de la maquette à l\'impression, pour intégrer un studio ou une imprimerie.',
                'niveau_requis' => 'Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 350000,
                'image' => 'graphisme-production.webp',
                'icon' => '🖨️',
                'tags' => ['Bac'],
                'debouches' => [
                    'Graphiste de production',
                    'Opérateur PAO',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Chaîne graphique et prépresse',
                    'Colorimétrie et impression',
                    'Logiciels de mise en page avancés',
                ],
                'ordre' => 15,
            ],
            [
                'title' => 'Montage Audio Vidéo',
                'abbreviation' => 'MONT-AV',
                'pole' => 'informatique',
                'description' => 'Montage, effets et post-production pour réaliser des contenus vidéo professionnels.',
                'niveau_requis' => 'Probatoire / Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'montage-audio-video.webp',
                'icon' => '🎬',
                'tags' => ['Probatoire / Bac'],
                'debouches' => [
                    'Monteur(se) vidéo',
                    'Créateur de contenu',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Montage vidéo professionnel',
                    'Habillage et effets spéciaux',
                    'Post-production audio',
                ],
                'ordre' => 16,
            ],
            [
                'title' => 'Développement Web',
                'abbreviation' => 'DEV-WEB',
                'pole' => 'informatique',
                'description' => 'Conception et développement de sites et applications web, du front-end au déploiement.',
                'niveau_requis' => 'Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 350000,
                'image' => 'developpement-web.webp',
                'icon' => '💻',
                'tags' => ['Bac'],
                'debouches' => [
                    'Développeur(se) web junior',
                    'Intégrateur(rice) web',
                    'Auto-emploi',
                ],
                'programme' => [
                    'HTML, CSS, JavaScript',
                    'Bases de données',
                    'Développement d\'applications web',
                ],
                'ordre' => 17,
            ],

            // ============================================
            // LOGISTIQUE ET TRANSPORT
            // ============================================
            [
                'title' => 'Douane et Transit',
                'abbreviation' => 'DOUANE',
                'pole' => 'logistique',
                'description' => 'Opérations douanières, transport international et réglementation pour rejoindre les métiers du port et du transit.',
                'niveau_requis' => 'Probatoire / Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 350000,
                'image' => 'douane-transit.webp',
                'icon' => '🚢',
                'tags' => ['Probatoire / Bac'],
                'debouches' => [
                    'Transitaire',
                    'Agent en douane',
                    'Logisticien',
                    'Courtier maritime',
                ],
                'programme' => [
                    'Techniques des opérations douanières',
                    'Droit et contentieux du transport',
                    'Commerce international',
                ],
                'ordre' => 18,
            ],
            [
                'title' => 'Déclarant en Douane',
                'abbreviation' => 'DECL-DOUANE',
                'pole' => 'logistique',
                'description' => 'Formalités déclaratives, tarification douanière et procédures d\'import-export.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 300000,
                'image' => 'declarant-douane.webp',
                'icon' => '📦',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Déclarant(e) en douane',
                    'Agent de transit junior',
                ],
                'programme' => [
                    'Procédures déclaratives',
                    'Tarification douanière',
                    'Documentation import-export',
                ],
                'ordre' => 19,
            ],

            // ============================================
            // HÔTELLERIE-RESTAURATION
            // ============================================
            [
                'title' => 'Cuisine-Bar-Restauration',
                'abbreviation' => 'CUISINE',
                'pole' => 'hotellerie',
                'description' => 'Techniques culinaires, service en salle et gestion de bar pour exercer en restauration professionnelle.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 400000,
                'image' => 'cuisine-bar-restauration.webp',
                'icon' => '🍳',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Commis de cuisine',
                    'Serveur(se) / Barman',
                    'Auto-emploi (restauration)',
                ],
                'programme' => [
                    'Techniques culinaires de base',
                    'Service en salle',
                    'Gestion de bar',
                ],
                'ordre' => 20,
            ],
            [
                'title' => 'Boulangerie-Pâtisserie',
                'abbreviation' => 'BOUL-PAT',
                'pole' => 'hotellerie',
                'description' => 'Fabrication de pains, viennoiseries et pâtisseries selon les standards professionnels.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 400000,
                'image' => 'boulangerie-patisserie.webp',
                'icon' => '🥐',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Boulanger(ère)',
                    'Pâtissier(ère)',
                    'Auto-emploi',
                ],
                'programme' => [
                    'Techniques de panification',
                    'Pâtisserie de base et avancée',
                    'Hygiène et sécurité alimentaire',
                ],
                'ordre' => 21,
            ],
            [
                'title' => 'Hôtellerie-Hébergement',
                'abbreviation' => 'HEBERG',
                'pole' => 'hotellerie',
                'description' => 'Accueil, gestion des chambres et service client pour travailler dans l\'hébergement hôtelier.',
                'niveau_requis' => 'BEPC / GCE O Level',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 400000,
                'image' => 'hotellerie-hebergement.webp',
                'icon' => '🛎️',
                'tags' => ['BEPC / GCE O Level'],
                'debouches' => [
                    'Réceptionniste d\'hôtel',
                    'Agent d\'étage',
                    'Concierge',
                ],
                'programme' => [
                    'Accueil et réception hôtelière',
                    'Gestion des chambres',
                    'Relation client en hôtellerie',
                ],
                'ordre' => 22,
            ],
            [
                'title' => 'Gestion Hôtelière',
                'abbreviation' => 'GEST-HOTEL',
                'pole' => 'hotellerie',
                'description' => 'Pilotage administratif et financier d\'un établissement hôtelier, pour évoluer vers des postes de management.',
                'niveau_requis' => 'Bac',
                'duration' => '9 mois + stage',
                'diplome' => 'DQP CQP BTS',
                'price' => 450000,
                'image' => 'gestion-hoteliere.webp',
                'icon' => '🏨',
                'tags' => ['Bac'],
                'debouches' => [
                    'Assistant(e) de direction hôtelière',
                    'Responsable d\'établissement junior',
                ],
                'programme' => [
                    'Gestion administrative hôtelière',
                    'Comptabilité hôtelière',
                    'Management d\'équipe',
                ],
                'ordre' => 23,
            ],
        ];

        foreach ($formations as $data) {
            $poleSlug = $data['pole'];

            if (!isset($poles[$poleSlug])) {
                throw new \RuntimeException(
                    "Le pôle '{$poleSlug}' n'existe pas. Lance PoleSeeder avant FormationPresentielSeeder."
                );
            }

            $data['pole_id'] = $poles[$poleSlug];
            unset($data['pole']);

            // Génère le slug à partir du titre — ex: "Secrétariat Bureautique" -> "secretariat-bureautique"
            $data['slug'] = Str::slug($data['title']);

            FormationPresentiel::create($data);
        }
    }
}