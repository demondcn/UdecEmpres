"use client";
import React, { useState, useEffect } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import InterfazResultados from '@/components/InterfazResultadosGradienteAnimadoColorido';

export default function Result() {
  const searchParams = useSearchParams();
  const diagnosisId = searchParams.get('diagnosisId');
  const userId = searchParams.get('userId');
  const router = useRouter();
  const [percentageTotal, setPercentageTotal] = useState(0);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchResults = async () => {
      if (diagnosisId) {
        try {
          const response = await fetch(`/api/results/${diagnosisId}`);
          const data = await response.json();

          if (response.ok) {
            setPercentageTotal(data.percentageTotal);
            setResults({
              reaultPrueb1: data.resultPrueb1 || 0,
              reaultPrueb2: data.resultPrueb2 || 0,
              reaultPrueb3: data.resultPrueb3 || 0,
              reaultPrueb4: data.resultPrueb4 || 0,
              reaultPrueb5: data.resultPrueb5 || 0,
              reaultPrueb6: data.resultPrueb6 || 0,
              reaultPrueb7: data.resultPrueb7 || 0
            });
          } else {
            setError(data.error || 'Failed to fetch data');
          }
        } catch (err) {
          setError('An error occurred while fetching data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [diagnosisId]);

  const handleReturnToStart = () => {
    router.push(`/InicioSeccion/usuario?userId=${userId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Navbar userId={userId}/>
    <InterfazResultados 
      resultadoEmpresarial={percentageTotal}
      reaultPrueb1={results.reaultPrueb1}
      reaultPrueb2={results.reaultPrueb2}
      reaultPrueb3={results.reaultPrueb3}
      reaultPrueb4={results.reaultPrueb4}
      reaultPrueb5={results.reaultPrueb5}
      reaultPrueb6={results.reaultPrueb6}
      reaultPrueb7={results.reaultPrueb7}
      onReturnToStart={handleReturnToStart}
    />
    </>
  );
}