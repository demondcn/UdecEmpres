"use client";
import React, { Suspense } from 'react';
import ConceptualizacionAreasFunc from '@/components/ConceptualizacionAreasFunc';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const DiagnosticContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const testId = 1;
  const status = 'Pending';
  const createdAt = new Date();
  const BotonRespuesta = async () => {
    // Redirige a la página específica con el userId en la URL
    try {
      const response = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, status, createdAt }),
      });

      if (!response.ok) {
        throw new Error('Failed to create diagnostic');
      }

      const { id } = await response.json();

      const response2 = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnosisId: id, number: testId }),
      });

      if (!response2.ok) {
        throw new Error('Failed to create test');
      }

      // Obtener el nuevo test del cuerpo de la respuesta de response2
      const { idtest } = await response2.json();
      // Paso 3: Actualizar fecha updatedAt del usuario
      const response3 = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response3.ok) {
        throw new Error('Failed to update user');
      }

      // Paso 3: Actualizar fecha updatedAt del usuario
      const response4 = await fetch('/api/updateEmpresAtivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response4.ok) {
        throw new Error('Failed to update empres');
      }


      // Redirigir a la página específica con el ID del nuevo test
      router.push(`/InicioSeccion/usuario/diagnostico/d${testId}?diagnosisId=${id}&testId=${idtest}`);
    } catch (error) {
      console.error('Error creating diagnostic:', error);
    }
  };

  return (
    <>
      <Navbar userId={userId} />
      <main>
        <ConceptualizacionAreasFunc
          Navigate={BotonRespuesta}
        />
      </main>
    </>
  );
}

export default function Diagnostic() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiagnosticContent />
    </Suspense>
  );
}
