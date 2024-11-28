"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, Building } from "lucide-react";
import { useRouter } from 'next/navigation';

const DiagnosticList = ({ userId }) => {
  const [diagnostics, setDiagnostics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDiagnostics = async () => {
      try {
        const response = await fetch(`/api/getdiagnostics?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch diagnostics');
        }
        const data = await response.json();
        setDiagnostics(data);
      } catch (error) {
        console.error('Error fetching diagnostics:', error);
      }
    };

    fetchDiagnostics();
  }, [userId]);

  const handleCardClick = (diagnosisId, testId, testNumber, isCompleted) => {
    if (isCompleted) {
      router.push(`/InicioSeccion/usuario/diagnostico/result?diagnosisId=${diagnosisId}&userId=${userId}`);
    } else {
      router.push(`/InicioSeccion/usuario/diagnostico/d${testNumber}?diagnosisId=${diagnosisId}&userId=${userId}&testId=${testId}`);
    }
  };

  // Helper function to get the highest number test for a diagnosis
  const getHighestTestNumber = (tests) => {
    if (tests.length === 0) return 0;
    return Math.max(...tests.map(test => test.number));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-[#4E9419] mb-8">Diagnósticos Realizados</h1>
      {diagnostics.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Hasta el momento no tienes diagnósticos, realiza uno en el apartado de &quot;Nuevo Diagnóstico&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnostics
            .filter(diagnostic => diagnostic.tests.length > 0) // Exclude diagnostics with no tests
            .map((diagnostic) => {
              // Determine the highest test number
              const highestTestNumber = getHighestTestNumber(diagnostic.tests);

              // Find the test with the highest number
              const highestTest = diagnostic.tests.find(test => test.number === highestTestNumber) || {};

              // Check if the diagnosis is completed
              const isCompleted = diagnostic.status.toLowerCase() === 'completate';

              return (
                <Card
                  key={diagnostic.id}
                  className="cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-[#FFF700] to-[#4E9419]"
                  onClick={() => handleCardClick(diagnostic.id, highestTest.id, highestTest.number, isCompleted)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <FileText className="w-6 h-6 mr-2 text-[#2C5234]" />
                        <h2 className="text-xl font-semibold text-[#2C5234]">
                          {isCompleted ? 'Completada' : (highestTest.description || 'Sin Nombre')}
                        </h2>
                      </div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-[#2C5234]" />
                        <p className="text-sm text-[#2C5234]">
                          {new Date(diagnostic.createdAt).toLocaleDateString() || 'Sin Fecha'}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 mr-2 text-[#2C5234]" />
                        <p className="text-sm text-[#2C5234]">
                          {isCompleted ? 'Completada' : ('Pendiente' || 'Sin Estado')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default DiagnosticList;
