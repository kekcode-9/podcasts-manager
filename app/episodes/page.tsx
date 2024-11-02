import React from 'react';
import { Suspense } from 'react';
import Episodes from '@/page-components/episodes';

export default function EpisodesPage() {
  return (
    <Suspense>
      <Episodes/>
    </Suspense>
  )
}
