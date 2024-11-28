"use client";
import { useSession } from 'next-auth/react';
import React, { Suspense } from 'react';
import Autoriz from '@/components/AutorizedDate';
import Navbar from '@/components/Navbar';

const ListDiagContent = () => {
  const {data:session} = useSession();
  const userId = session?.user?.id;

  return (
    <>
      <Navbar userId={userId} />
      <main>
        <Autoriz />
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