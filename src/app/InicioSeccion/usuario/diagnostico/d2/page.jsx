"use client";
import React, { Suspense } from 'react';
import { useRouter,  useSearchParams  } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CuestionarioDesarrolloDireccionGeneral from '@/components/CuestionarioDesarrolloDireccionGeneral'
import { useSession } from "next-auth/react";
const Di2Content = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const testId = searchParams.get('testId');
  const number = 3;
  const diagnosisId = searchParams.get('diagnosisId');
  const userId = session?.user?.id;
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

  try {
    const response = await fetch('/api/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diagnosisId, number } ),
    });

    if (!response.ok) {
      throw new Error('Failed to create test');
    }

    // Obtener el nuevo test del cuerpo de la respuesta
    const { idtest } = await response.json();

    // Redirigir a la página específica con el ID del nuevo test
    router.push(`/InicioSeccion/usuario/diagnostico/d${number}?diagnosisId=${diagnosisId}&testId=${idtest}`);
} catch (error) {
    console.error('Error creating test:', error);
  }
};
  return (
    <>
    <Navbar userId={userId}/>
    <main>
      < CuestionarioDesarrolloDireccionGeneral
       onNavigate={handleNavigation}
       />
    </main>
    </>
  )
}
export default function Di2() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Di2Content />
    </Suspense>
  );
}
