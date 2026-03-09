export type Plante = {
  id: string;
  nom: string;
  nom_latin: string | null;
  sous_titre: string | null;
  famille: string | null;
  description: string | null;
  intro: string | null;
  sens: string | null;
  vertus: string | null;
  contre_indications: string | null;
  vignes: string | null;
  proprietes: string[];
  image_url: string | null;
  audio_url: string | null;
  ordre: number;
};
