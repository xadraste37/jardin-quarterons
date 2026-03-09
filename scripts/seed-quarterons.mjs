import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Plants ────────────────────────────────────────────────────────────────────

const PLANTS = [
  {
    nom: 'Camomille matricaire',
    nom_latin: 'Matricaria chamomilla',
    sous_titre: 'Plante biodynamique',
    description: 'La camomille matricaire est située proche du chai et est très utilisée en biodynamie pour lutter contre la sécheresse et les maladies fongiques. Elle intervient dans la préparation 503 du compost biodynamique, aidant à structurer et activer sa décomposition. Ses fleurs blanches au cœur jaune dégagent un parfum de pomme et sont utilisées en tisane apaisante le soir.',
    proprietes: ['Antifongique', 'Compost biody 503', 'Anti-inflammatoire', 'Tisane apaisante'],
    image_url: null,
    audio_url: null,
    ordre: 1,
  },
  {
    nom: 'Valériane officinale',
    nom_latin: 'Valeriana officinalis',
    sous_titre: 'Plante sédative et biodynamique',
    description: 'La valériane est une plante aux multiples vertus. En biodynamie, elle est utilisée dans la préparation 507 : son extrait est pulvérisé sur les fleurs de vigne pour les protéger du gel printanier. Pour l\'homme, la valériane officinale possède des vertus anxiolytiques et sédatives reconnues, favorisant un sommeil réparateur.',
    proprietes: ['Anxiolytique', 'Sédative', 'Compost biody 507', 'Anti-gel vigne'],
    image_url: null,
    audio_url: null,
    ordre: 2,
  },
  {
    nom: 'Achillée millefeuille',
    nom_latin: 'Achillea millefolium',
    sous_titre: 'Plante cicatrisante',
    description: 'L\'achillée millefeuille est l\'une des plantes biodynamiques les plus importantes. Elle entre dans la composition de la préparation 502 du compost. Elle renforce la résistance des plantes aux maladies et favorise la formation d\'humus dans le sol. Ses vertus cicatrisantes sont connues depuis l\'Antiquité.',
    proprietes: ['Cicatrisante', 'Compost biody 502', 'Anti-infectieux', 'Renforce l\'humus'],
    image_url: null,
    audio_url: null,
    ordre: 3,
  },
  {
    nom: 'Lavande',
    nom_latin: 'Lavandula angustifolia',
    sous_titre: 'Plante odorante et mellifère',
    description: 'La lavande est une sentinelle des jardins méditerranéens. Son parfum envahit le jardin au printemps et en été. Les abeilles l\'adorent, en font un miel exceptionnel et contribuent à la pollinisation du vignoble. Elle possède des propriétés antiseptiques et relaxantes reconnues.',
    proprietes: ['Antiseptique', 'Mellifère', 'Relaxante', 'Pollinisateurs'],
    image_url: null,
    audio_url: null,
    ordre: 4,
  },
  {
    nom: 'Menthe poivrée',
    nom_latin: 'Mentha × piperita',
    sous_titre: 'Plante mentholée',
    description: 'La menthe poivrée rafraîchit tout ce qu\'elle touche. Son parfum intense et immédiatement reconnaissable est dû au menthol. Elle est utilisée en cuisine dans les cocktails et tisanes digestives du soir. En jardin biodynamique, elle repousse certains insectes nuisibles.',
    proprietes: ['Digestive', 'Rafraîchissante', 'Répulsif naturel', 'Tisane'],
    image_url: null,
    audio_url: null,
    ordre: 5,
  },
  {
    nom: 'Poivre des moines',
    nom_latin: 'Vitex agnus-castus',
    sous_titre: 'Plante poivrée',
    description: 'Le poivre des moines réchauffe les sens avec son goût intense et presque piquant. On le retrouve souvent dans les mélanges d\'épices aromatiques. Cette plante arbustive aux fleurs violettes est également connue pour ses propriétés médicinales liées à l\'équilibre hormonal.',
    proprietes: ['Aromatique', 'Épicée', 'Médicinale', 'Equilibre hormonal'],
    image_url: null,
    audio_url: null,
    ordre: 6,
  },
  {
    nom: 'Hélichryse italienne',
    nom_latin: 'Helichrysum italicum',
    sous_titre: 'La plante à Curry',
    description: 'L\'hélichryse italienne est reconnaissable à sa couleur jaune vif et son parfum qui rappelle le curry. Elle est souvent confondue avec une épice venue d\'Asie. En aromathérapie, son huile essentielle est très prisée pour ses vertus anti-hématome et anti-inflammatoire.',
    proprietes: ['Anti-hématome', 'Anti-inflammatoire', 'Aromatique', 'Huile essentielle'],
    image_url: null,
    audio_url: null,
    ordre: 7,
  },
  {
    nom: 'Ortie dioïque',
    nom_latin: 'Urtica dioica',
    sous_titre: 'Plante biodynamique par excellence',
    description: 'L\'ortie est indispensable en biodynamie. Mélangée à la bouse dans la préparation T500, elle enrichit le mélange en azote et en silice. En purin, elle stimule les défenses naturelles de la vigne contre les maladies fongiques. Une plante sous-estimée mais essentielle !',
    proprietes: ['Riche en azote', 'Biostimulant', 'Antifongique', 'Préparation T500'],
    image_url: null,
    audio_url: null,
    ordre: 8,
  },
  {
    nom: 'Prêle des champs',
    nom_latin: 'Equisetum arvense',
    sous_titre: 'Bouclier antifongique',
    description: 'La prêle des champs est riche en silice, ce qui en fait un excellent antifongique naturel. En biodynamie, sa décoction (préparation 508) est pulvérisée sur les vignes pour prévenir le mildiou et l\'oïdium. Elle renforce la résistance naturelle des plantes.',
    proprietes: ['Antifongique', 'Riche en silice', 'Préparation 508', 'Anti-mildiou'],
    image_url: null,
    audio_url: null,
    ordre: 9,
  },
  {
    nom: 'Consoude officinale',
    nom_latin: 'Symphytum officinale',
    sous_titre: 'Plante reconstructrice',
    description: 'La consoude est surnommée "herbe aux os" pour ses vertus cicatrisantes exceptionnelles. Riche en potassium et en azote, elle est utilisée en compost pour accélérer sa décomposition. En biodynamie, son purin stimule la croissance des racines et renforce la résistance des plants.',
    proprietes: ['Cicatrisante', 'Riche en potassium', 'Stimulant racinaire', 'Compost'],
    image_url: null,
    audio_url: null,
    ordre: 10,
  },
];

async function seed() {
  console.log('🌱 Seeding Jardin des Quarterons — plantes...\n');

  // Check if plante table exists
  const { error: checkErr } = await supabase.from('qj_plante').select('id').limit(1);
  if (checkErr?.code === 'PGRST205') {
    console.error('❌ Table qj_plante not found!');
    console.log('\nRun supabase/schema.sql in the Supabase dashboard first:');
    console.log('https://supabase.com/dashboard/project/blkzckjwlpuxqckduypi/sql/new');
    process.exit(1);
  }

  // Clear existing plants
  await supabase.from('qj_plante').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // Insert plants
  const { data, error } = await supabase
    .from('qj_plante')
    .insert(PLANTS)
    .select();

  if (error) { console.error('Plants error:', error); process.exit(1); }
  console.log(`✅ ${data.length} plantes insérées:`);
  data.forEach(p => console.log(`   ${p.ordre}. ${p.nom}`));
  console.log('\n🎉 Done! Guide des plantes prêt.');
}

seed().catch(console.error);
