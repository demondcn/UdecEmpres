"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CuestionarioInvestigacionDesarrollo from '@/components/CuestionarioInvestigacionDesarrollo'
import { useSession } from "next-auth/react";
const Di7Content = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const testId = searchParams.get('testId');
  const diagnosisId = searchParams.get('diagnosisId');
  const userId = session?.user?.id;
  const status = 'Completate';
  const router = useRouter();

  const handleNavigation = async (average) => {

    const responseGuardado = await fetch('/api/updateTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ testId: testId, average: average }),
  });

  if (responseGuardado.ok) {
    console.log("Datos Guardados " + testId)
  } else {
    console.error('Error al actualizar el test ' + testId + ' y ' + average);
  }
  //cambia
 try {
      const response = await fetch('/api/updateDiagnostic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnosisId, status } ),
      });

      if (!response.ok) {
        throw new Error('Failed to update diagnostic');
      }

      // Redirigir a la página específica con el ID del nuevo test
      router.push(`/InicioSeccion/usuario/diagnostico/result?diagnosisId=${diagnosisId}`);
  } catch (error) {
      console.error('Error creating test:', error);
    }
    //
  };
  return (
    <>
    <Navbar userId={userId}/>
    <main>
      <CuestionarioInvestigacionDesarrollo 
        onNavigate={handleNavigation}
      />
    </main>
    </>
  )
}
export default function Di7() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Di7Content />
    </Suspense>
  );
}