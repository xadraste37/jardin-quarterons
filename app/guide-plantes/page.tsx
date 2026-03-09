import { supabase } from '@/lib/supabase';
import GuidePlantesClient from './GuidePlantesClient';
import type { Plante } from '@/lib/types';

export default async function GuidePlantesPage() {
  let plants: Plante[] = [];

  try {
    const { data } = await supabase
      .from('qj_plante')
      .select('*')
      .order('ordre', { ascending: true });

    if (data) plants = data as Plante[];
  } catch {
    // empty — GuidePlantesClient handles empty state
  }

  return <GuidePlantesClient plants={plants} />;
}
