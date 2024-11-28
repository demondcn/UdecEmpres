import React, { useEffect, useState } from 'react';
import { Home, BarChart2, ClipboardList, LogOut, Menu } from "lucide-react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';  // Importa useRoute
import { useSession } from "next-auth/react";
const Navbar = ({ userId }) => {
  const status = 'Pending';
  const createdAt = new Date();
  const { data: session } = useSession();
  const [hasCompanies, setHasCompanies] = useState(false);
  const router = useRouter();
  const navStyle = {
    background: 'linear-gradient(-45deg, #4E9419, #2C5234)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
  };

  const linkStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
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
      }
    };

    if (userId) {
      checkUserCompanies();
    }
  }, [userId]);
  const disabledButtonStyle = {
    ...linkStyle,
    cursor: 'not-allowed',  // Añade estilo de cursor
    opacity: 0.5,           // Baja la opacidad para un efecto visual de "deshabilitado"
  };
  const handleNewDiagnostic = async () => {
    router.push(`/InicioSeccion/usuario/diagnostico`);
  };
  const handleViewDiagnostics = () => {
    router.push('/InicioSeccion/usuario/diagnosticos');
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav style={navStyle}>
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        <a href={`/InicioSeccion/usuario`} style={linkStyle}>
          <Home style={{ marginRight: '0.5rem' }} />
          Inicio
        </a>
        <div style={{ display: 'flex' }}>
          <button
            onClick={hasCompanies ? handleNewDiagnostic : null}  // Solo permite click si hasCompanies es true
            style={hasCompanies ? linkStyle : disabledButtonStyle}  // Cambia el estilo según el estado
            disabled={!hasCompanies}  // Deshabilita el botón si hasCompanies es false
          >
            <BarChart2 style={{ marginRight: '0.5rem' }} />
            Nuevo Diagnóstico
          </button>
          <button 
            onClick={hasCompanies ? handleViewDiagnostics : null}  // Solo permite click si hasCompanies es true
            style={hasCompanies ? linkStyle : disabledButtonStyle}  // Cambia el estilo según el estado
            disabled={!hasCompanies}  // Deshabilita el botón si hasCompanies es false
          >
            <ClipboardList style={{ marginRight: '0.5rem' }} />
            Ver Diagnósticos
          </button>
          <button onClick={handleSignOut} style={linkStyle}>
            <LogOut style={{ marginRight: '0.5rem' }} />
            Cerrar Sesión
          </button>
        </div>
        <button
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem',
            '@media (max-width: 768px)': {
              display: 'block',
            },
          }}
        >
          <Menu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;