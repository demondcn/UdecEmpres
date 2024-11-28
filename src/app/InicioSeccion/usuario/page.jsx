// pages/User.jsx
"use client";
import React, { useEffect, useState } from 'react';
import ISUMDiagnosticInterface from '@/components/ISUMDiagnosticInterface';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import MessageAlAdmin from '@/components/AdminDashboardSContent/MesajeAdminFuntion'
const UserContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasCompanies, setHasCompanies] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpenChange = (open) => {
    setIsDialogOpen(open);
  };

  useEffect(() => {
    const checkUserCompanies = async () => {
      try {
        const response = await fetch('/api/checkUserHasCompanies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        setHasCompanies(data.hasCompanies);
      } catch (error) {
        console.error('Error checking user companies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      checkUserCompanies();
    }
  }, [userId]);

  const handleNewDiagnostic = () => {
    router.push(`/InicioSeccion/usuario/diagnostico`);
  };

  const handleViewDiagnostics = () => {
    router.push(`/InicioSeccion/usuario/diagnosticos`);
  };

  const handleRegisterEmpress = () => {
    router.push(`/InicioSeccion/AutorizedDates`);
  };
  const MensajeAdmin = () => {
    setIsDialogOpen(true);
  };


  return (
    <main>
      <Navbar userId={userId} />
      <ISUMDiagnosticInterface
        onNewDiagnostic={handleNewDiagnostic}
        onViewDiagnostics={handleViewDiagnostics}
        onRegister={handleRegisterEmpress}
        hasCompanies={hasCompanies}
        loading={loading}
        Mensaje={MensajeAdmin}
      />
      <MessageAlAdmin
        isOpen={isDialogOpen}
        onOpenChange={handleOpenChange}
        id={userId} 
      />
    </main>
  );
};

export default UserContent;
