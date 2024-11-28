"use client";
import { useSession } from 'next-auth/react';
import React, { Suspense } from 'react';
import RegisterEmpress from '@/components/CompanyRegistrationInterface';
import Navbar from '@/components/Navbar';

const ListDiagContent = () => {
  const {data:session} = useSession();
  const userId = session?.user?.id;

  return (
    <>
      <Navbar userId={userId} />
      <main>
        <RegisterEmpress userId={userId} />
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