-- Jardin des Quarterons — full schema
-- Run in Supabase SQL editor: https://supabase.com/dashboard/project/blkzckjwlpuxqckduypi/sql/new

-- ─── Core tables (kept for future CMS use) ────────────────────────────────────

CREATE TABLE IF NOT EXISTS qj_parcours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT, subtitle TEXT, cover_image_url TEXT, intro_text TEXT,
  conclusion_audio_url TEXT, conclusion_quote TEXT, conclusion_quote_author TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS qj_chapitre (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcours_id UUID REFERENCES qj_parcours(id) ON DELETE CASCADE,
  order_index INTEGER, title TEXT, subtitle TEXT, type TEXT, intro_card_text TEXT
);

CREATE TABLE IF NOT EXISTS qj_ecran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapitre_id UUID REFERENCES qj_chapitre(id) ON DELETE CASCADE,
  order_index INTEGER, type TEXT, data JSONB
);

-- ─── Plant guide table ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS qj_plante (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  nom_latin TEXT,
  sous_titre TEXT,
  famille TEXT,
  description TEXT,
  intro TEXT,
  sens TEXT,
  vertus TEXT,
  contre_indications TEXT,
  vignes TEXT,
  proprietes JSONB DEFAULT '[]',
  image_url TEXT,
  audio_url TEXT,
  ordre INTEGER DEFAULT 0
);

-- Migration for existing installs
ALTER TABLE qj_plante
  ADD COLUMN IF NOT EXISTS famille TEXT,
  ADD COLUMN IF NOT EXISTS intro TEXT,
  ADD COLUMN IF NOT EXISTS sens TEXT,
  ADD COLUMN IF NOT EXISTS vertus TEXT,
  ADD COLUMN IF NOT EXISTS contre_indications TEXT,
  ADD COLUMN IF NOT EXISTS vignes TEXT;

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_qj_chapitre_parcours ON qj_chapitre(parcours_id);
CREATE INDEX IF NOT EXISTS idx_qj_ecran_chapitre ON qj_ecran(chapitre_id);
CREATE INDEX IF NOT EXISTS idx_qj_plante_ordre ON qj_plante(ordre);

-- ─── RLS: public read ─────────────────────────────────────────────────────────

ALTER TABLE qj_parcours ENABLE ROW LEVEL SECURITY;
ALTER TABLE qj_chapitre ENABLE ROW LEVEL SECURITY;
ALTER TABLE qj_ecran    ENABLE ROW LEVEL SECURITY;
ALTER TABLE qj_plante   ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='qj_parcours' AND policyname='Public read parcours') THEN
    CREATE POLICY "Public read parcours" ON qj_parcours FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='qj_chapitre' AND policyname='Public read chapitre') THEN
    CREATE POLICY "Public read chapitre" ON qj_chapitre FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='qj_ecran' AND policyname='Public read ecran') THEN
    CREATE POLICY "Public read ecran" ON qj_ecran FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='qj_plante' AND policyname='Public read plantes') THEN
    CREATE POLICY "Public read plantes" ON qj_plante FOR SELECT TO anon USING (true);
  END IF;
END $$;
