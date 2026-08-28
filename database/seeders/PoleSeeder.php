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
                'nom' => 'Techniques Administratives et Comptables',
                'slug' => 'gestion',
                'description' => "Le pôle Techniques Administratives et Comptables forme aux fonctions clés de l'entreprise : secrétariat, comptabilité, fiscalité et gestion bancaire. De la Secrétariat Bureautique à la Fiscalité d'Entreprise, ces formations préparent à des postes administratifs et financiers recherchés dans les PME comme les grandes structures.",
                'description_courte' => 'Secrétariat, comptabilité, fiscalité, banque et microfinance.',
                'image' => '/assets/images/poles/gestion.webp',
                'couleur' => '#153B62',
                'icone' => 'BriefcaseIcon',
                'ordre' => 1,
            ],
            [
                'nom' => 'Paramédical & Santé',
                'slug' => 'paramedical',
                'description' => "Le pôle Paramédical & Santé forme aux métiers du soin et de l'assistance médicale : auxiliaire de vie, secrétariat médical, vente en pharmacie, assistanat en cabinet médical, délégation médicale et massothérapie. Une formation exigeante, en phase avec les besoins réels du secteur de la santé au Cameroun.",
                'description_courte' => 'Auxiliaire de vie, secrétariat médical, vente en pharmacie, délégué médical.',
                'image' => '/assets/images/poles/paramedical.webp',
                'couleur' => '#E13A4B',
                'icone' => 'HeartIcon',
                'ordre' => 2,
            ],
            [
                'nom' => 'Génie Informatique',
                'slug' => 'informatique',
                'description' => "Le pôle Génie Informatique prépare aux métiers techniques et créatifs du numérique : maintenance informatique, infographie, graphisme de production, montage audiovisuel et développement web. Les apprenants travaillent sur du matériel et des logiciels professionnels dès les premières semaines.",
                'description_courte' => 'Maintenance informatique, infographie, montage vidéo, développement web.',
                'image' => '/assets/images/poles/informatique.webp',
                'couleur' => '#165DF3',
                'icone' => 'ComputerDesktopIcon',
                'ordre' => 3,
            ],
            [
                'nom' => 'Logistique & Transport',
                'slug' => 'logistique',
                'description' => "Le pôle Logistique & Transport forme aux métiers de la douane et du transit : opérations douanières, réglementation du commerce international et déclaration en douane. Une filière stratégique pour les futurs professionnels du port et de la chaîne logistique camerounaise.",
                'description_courte' => 'Douane et transit, déclaration en douane.',
                'image' => '/assets/images/poles/logistique.webp',
                'couleur' => '#6FA30E',
                'icone' => 'TruckIcon',
                'ordre' => 4,
            ],
            
            [
                'nom' => 'Hôtellerie & Restauration',
                'slug' => 'hotellerie',
                'description' => "Le pôle Hôtellerie & Restauration forme aux savoir-faire culinaires et hôteliers : cuisine-bar-restauration, boulangerie-pâtisserie, hébergement hôtelier et gestion hôtelière. Les ateliers pratiques reproduisent les conditions réelles d'un établissement professionnel.",
                'description_courte' => 'Cuisine-bar, boulangerie-pâtisserie, hébergement, gestion hôtelière.',
                'image' => '/assets/images/poles/hotellerie.webp',
                'couleur' => '#FD7D0F',
                'icone' => 'CakeIcon',
                'ordre' => 5,
            ],
        ];

        foreach ($poles as $pole) {
            Pole::updateOrCreate(['slug' => $pole['slug']], $pole);
        }
    }
}
