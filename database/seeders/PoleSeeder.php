<?php
// database/seeders/PoleSeeder.php
namespace Database\Seeders;

use App\Models\Pole;
use Illuminate\Database\Seeder;

class PoleSeeder extends Seeder
{
    public function run(): void
    {
        $poles = [
            [
                'nom' => 'Paramédical & Santé',
                'slug' => 'paramedical',
                'description' => "Le pôle Paramédical & Santé forme aux métiers du soin et de l'assistance médicale : soins infirmiers, secrétariat médical et vente en pharmacie. Les apprenants alternent cours théoriques et mises en situation encadrées, en lien avec les exigences réelles du secteur de la santé au Cameroun.",
                'description_courte' => 'Soins infirmiers, secrétariat médical, vente en pharmacie.',
                'image' => '/assets/images/poles/paramedical.webp',
                'couleur' => '#E13A4B',
                'icone' => 'HeartIcon',
                'ordre' => 1,
            ],
            [
                'nom' => 'Informatique & Digital',
                'slug' => 'informatique',
                'description' => "Le pôle Informatique & Digital prépare aux métiers du numérique : infographie, bureautique, community management et e-commerce. Les apprenants travaillent sur des logiciels professionnels et des projets concrets, pour être immédiatement opérationnels sur le marché du travail ou en freelance.",
                'description_courte' => 'Infographie, bureautique, community management, e-commerce.',
                'image' => '/assets/images/poles/informatique.webp',
                'couleur' => '#165DF3',
                'icone' => 'ComputerDesktopIcon',
                'ordre' => 2,
            ],
            [
                'nom' => 'Gestion & Management',
                'slug' => 'gestion',
                'description' => "Le pôle Gestion & Management couvre les fonctions administratives et financières de l'entreprise : douane et transit, gestion d'entreprise et fiscalité. Une formation pensée pour les futurs cadres administratifs et entrepreneurs.",
                'description_courte' => "Douane et transit, gestion d'entreprise, fiscalité.",
                'image' => '/assets/images/poles/gestion.webp',
                'couleur' => '#153B62',
                'icone' => 'BriefcaseIcon',
                'ordre' => 3,
            ],
            [
                'nom' => 'Hôtellerie & Métiers de bouche',
                'slug' => 'hotellerie',
                'description' => "Le pôle Hôtellerie & Métiers de bouche forme aux savoir-faire culinaires et à la restauration : cuisine, pâtisserie et boucherie-charcuterie. Les ateliers pratiques reproduisent les conditions réelles d'un établissement professionnel.",
                'description_courte' => 'Cuisine, pâtisserie, boucherie-charcuterie.',
                'image' => '/assets/images/poles/hotellerie.webp',
                'couleur' => '#FD7D0F',
                'icone' => 'CakeIcon',
                'ordre' => 4,
            ],
        ];

        foreach ($poles as $pole) {
            Pole::updateOrCreate(['slug' => $pole['slug']], $pole);
        }
    }
}
