import { supabase } from '@/lib/supabase';
import type { Plante } from '@/lib/types';
import AromathequeClient from './AromathequeClient';

export default async function MaAromatheque() {
  let plants: Plante[] = [];
  try {
    const { data } = await supabase
      .from('qj_plante')
      .select('*')
      .order('ordre', { ascending: true });
    plants = (data as Plante[]) || [];
  } catch {}

  return <AromathequeClient plants={plants} />;
}
