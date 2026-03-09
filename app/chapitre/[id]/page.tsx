import { redirect } from 'next/navigation';

// Chapters 1–4 are now static routes. This catches any unknown ids.
export default function CatchAllChapitre({ params }: { params: { id: string } }) {
  const known = ['1', '2', '3', '4'];
  if (known.includes(params.id)) redirect(`/chapitre/${params.id}`);
  redirect('/menu');
}
