"use client";
import React, { Suspense } from 'react';
import VentMark from '@/components/ContextMarkVent';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';

const ListDiagContent = () =>  {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  return (
    <>
      <Navbar userId={userId}/>
    <main>
      <VentMark userId={userId}/>
    </main>
    </>
  );
}

export default function ListDiag() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListDiagContent />
    </Suspense>
  );
}