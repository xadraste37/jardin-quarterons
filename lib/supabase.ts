import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      qj_parcours: {
        Row: {
          id: string;
          title: string | null;
          subtitle: string | null;
          cover_image_url: string | null;
          intro_text: string | null;
          conclusion_audio_url: string | null;
          conclusion_quote: string | null;
          conclusion_quote_author: string | null;
          created_at: string;
        };
      };
      qj_chapitre: {
        Row: {
          id: string;
          parcours_id: string | null;
          order_index: number | null;
          title: string | null;
          subtitle: string | null;
          type: string | null;
          intro_card_text: string | null;
        };
      };
      qj_ecran: {
        Row: {
          id: string;
          chapitre_id: string | null;
          order_index: number | null;
          type: string | null;
          data: Record<string, unknown> | null;
        };
      };
    };
  };
};
