import React from 'react';
import { Suspense } from 'react';
import Home from '@/page-components/home';

export default function HomePage() {
  return (
    <Suspense>
      <Home/>
    </Suspense>
  )
}
