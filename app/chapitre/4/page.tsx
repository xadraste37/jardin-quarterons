import { Suspense } from 'react';
import Chapitre4Client from './Chapitre4Client';

export default function Chapitre4Page() {
  return (
    <Suspense fallback={null}>
      <Chapitre4Client />
    </Suspense>
  );
}
