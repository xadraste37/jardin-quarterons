-- Migration: Add full plant content fields to qj_plante
ALTER TABLE qj_plante
  ADD COLUMN IF NOT EXISTS famille text,
  ADD COLUMN IF NOT EXISTS intro text,
  ADD COLUMN IF NOT EXISTS sens text,
  ADD COLUMN IF NOT EXISTS vertus text,
  ADD COLUMN IF NOT EXISTS contre_indications text,
  ADD COLUMN IF NOT EXISTS vignes text;
