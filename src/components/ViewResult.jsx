"use client";
import React, { useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/AdminDashboardSContent/Sidebar';
import { useRouter } from 'next/navigation';
const InterfazResultados = ({
  resultadoEmpresarial,
  reaultPrueb1,
  reaultPrueb2,
  reaultPrueb3,
  reaultPrueb4,
  reaultPrueb5,
  reaultPrueb6,
  reaultPrueb7,
}) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animated-gradient {
        animation: gradientAnimation 15s ease infinite;
        background: linear-gradient(-45deg, #FFF700, #4E9419, #2C5234);
        background-size: 400% 400%;
      }
      .animated-bar {
        animation: gradientAnimation 15s ease infinite;
        fill: url(#barGradient);
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const totalEmpres = Math.floor(resultadoEmpresarial);

  const router = useRouter();
  const data = [
    { name: 'Ventas y Marketing', valor: reaultPrueb1 },
    { name: 'Dirección General', valor: reaultPrueb2 },
    { name: 'Área de Finanzas', valor: reaultPrueb3 },
    { name: 'Talento Humano', valor: reaultPrueb4 },
    { name: 'Producción y Operaciones', valor: reaultPrueb5 },
    { name: 'Tecnologías de la Información', valor: reaultPrueb6 },
    { name: 'Investigación y Desarrollo', valor: reaultPrueb7 },
  ];
  const colorGeneral = (puntaje) => {
    if (puntaje < 33) {
      return "#FF0000";
    } else if (puntaje >= 33 && puntaje < 66) {
      return "#FFFF00";
    } else if (puntaje >= 66 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorg = colorGeneral(resultadoEmpresarial)
  const colorVentasYMarketing = (puntaje) => {
    if (puntaje < 58) {
      return "#FF0000";
    } else if (puntaje >= 58 && puntaje < 78) {
      return "#FFFF00";
    } else if (puntaje >= 78 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorDIRECCIÓNGENERAL = (puntaje) => {
    if (puntaje < 59) {
      return "#FF0000";
    } else if (puntaje >= 59 && puntaje < 82) {
      return "#FFFF00";
    } else if (puntaje >= 82 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorAreaFinanzas = (puntaje) => {
    if (puntaje < 60) {
      return "#FF0000";
    } else if (puntaje >= 60 && puntaje < 83) {
      return "#FFFF00";
    } else if (puntaje >= 83 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorTalentoHumano = (puntaje) => {
    if (puntaje < 60) {
      return "#FF0000";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "#FFFF00";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorProduccionOperaciones = (puntaje) => {
    if (puntaje < 60) {
      return "#FF0000";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "#FFFF00";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorTecnologiasInformacion = (puntaje) => {
    if (puntaje < 60) {
      return "#FF0000";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "#FFFF00";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };
  const colorInvestigacionDesarrollo = (puntaje) => {
    if (puntaje < 60) {
      return "#FF0000";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "#FFFF00";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "#008000";
    } else {
      return "#008000";
    }
  };





  const colors = [
    colorVentasYMarketing(reaultPrueb1),
    colorDIRECCIÓNGENERAL(reaultPrueb2), // Color para DIRECCIÓN GENERAL
    colorAreaFinanzas(reaultPrueb3), // Color para Area Finanzas
    colorTalentoHumano(reaultPrueb4), // Color para Talento Humano
    colorProduccionOperaciones(reaultPrueb5), // Color para Produccion Operaciones
    colorTecnologiasInformacion(reaultPrueb6), // Color para Tecnologias Informacion
    colorInvestigacionDesarrollo(reaultPrueb7)  // Color para Investigacion Desarrollo
  ];

  const CustomBar = (props) => {
    const { x, y, width, height, index } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={colors[index]} // Usa el color correspondiente
        />
      </g>
    );
  };

  const CustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text x={x + width + 5} y={y + 15} fill="#2C5234" fontWeight="bold">
        {`${value}%`}
      </text>
    );
  };
  const getMensajeResumen = (puntaje) => {
    if (puntaje < 33) {
      return "La evaluación revela un desempeño general bajo. La empresa enfrenta desafíos significativos y necesita abordar de manera urgente las áreas críticas para mejorar el rendimiento general. Se recomienda una revisión integral de las estrategias y procesos para superar las barreras actuales y poner en marcha un plan de mejora sólido.";
    } else if (puntaje >= 33 && puntaje < 66) {
      return "El desempeño general es medio. Aunque la empresa cumple con las expectativas básicas, hay un potencial considerable para mejorar en áreas específicas. Es importante enfocarse en las áreas que presentan oportunidades de mejora para optimizar los resultados y elevar el nivel general de desempeño.";
    } else if (puntaje >= 66 && puntaje < 100) {
      return "El desempeño general es positivo, con una buena ejecución en varias áreas. No obstante, siempre es posible optimizar. Se aconseja revisar las áreas con menor desempeño para identificar oportunidades de mejora y asegurar que el alto nivel de desempeño se mantenga y se expanda.";
    } else {
      return "El desempeño general es excepcional. La empresa muestra un alto nivel de éxito en la mayoría de las áreas evaluadas. Es crucial seguir con las prácticas actuales y explorar nuevas oportunidades para mantener y elevar aún más el nivel de excelencia alcanzado.";
    }
  };
  const getMensajeDesempenoGeneral = (puntaje) => {
    if (puntaje < 33) {
      return "El desempeño general de la empresa es bajo. Las áreas clave muestran deficiencias significativas, y se requiere una revisión completa de las estrategias y procesos actuales. Se recomienda una evaluación exhaustiva de cada área para identificar las causas subyacentes y desarrollar un plan de mejora integral.";
    } else if (puntaje >= 33 && puntaje < 66) {
      return "El desempeño general es medio. La empresa está cumpliendo con las expectativas básicas en varias áreas, pero hay oportunidades significativas para mejorar. Se recomienda revisar las estrategias y procesos en áreas específicas para optimizar el rendimiento general y alcanzar un nivel más alto de eficiencia y efectividad.";
    } else if (puntaje >= 66 && puntaje < 100) {
      return "El desempeño general es bueno, con varias áreas funcionando de manera efectiva. Sin embargo, siempre hay espacio para mejorar. Considerar revisar las áreas con menor puntaje para fortalecer los procesos y estrategias, lo que puede llevar a un desempeño aún mejor en el futuro.";
    } else {
      return "El desempeño general es excelente. La empresa está funcionando a un nivel muy alto en la mayoría de las áreas. Se recomienda mantener las prácticas y estrategias actuales, continuar con la innovación y buscar oportunidades para mantener y superar este alto nivel de desempeño.";
    }
  };
  const getMensajeVentasYMarketing = (puntaje) => {
    if (puntaje < 58) {
      return "Nuestra evaluación muestra un bajo rendimiento en las áreas de ventas y marketing. Las estrategias actuales no están logrando los resultados esperados, con un bajo alcance de clientes y una limitada penetración en el mercado. Recomendamos una reestructuración completa de la estrategia de marketing, enfocándose en aprovechar las herramientas digitales, además de la creación de campañas más segmentadas y orientadas a resultados. Es fundamental redefinir los objetivos comerciales y mejorar la capacitación del equipo de ventas para aumentar las conversiones y la fidelización de clientes.";
    } else if (puntaje >= 58 && puntaje < 78) {
      return "El rendimiento en ventas y marketing es medio. Las estrategias actuales están funcionando hasta cierto punto, pero hay oportunidades para mejorar. Se recomienda ajustar las tácticas de marketing y ventas para maximizar el alcance y la efectividad. Considerar una revisión de las campañas actuales y explorar nuevas estrategias digitales para optimizar los resultados.";
    } else if (puntaje >= 78 && puntaje < 100) {
      return "El desempeño en ventas y marketing es bueno, pero aún hay margen para la mejora. Las estrategias actuales están generando resultados positivos, pero se pueden implementar tácticas adicionales para mejorar el alcance y la conversión. Explorar nuevas oportunidades en marketing digital y reforzar las estrategias de fidelización puede llevar a resultados aún mejores.";
    } else {
      return "El desempeño en ventas y marketing es excelente. Las estrategias están funcionando muy bien, con un alto alcance de clientes y una sólida penetración en el mercado. Se recomienda mantener las estrategias actuales y continuar innovando para mantener este alto nivel de rendimiento. Aprovechar las oportunidades emergentes y continuar con la capacitación del equipo de ventas para asegurar el éxito continuo.";
    }
  };

  const getMensajeDireccionGeneral = (puntaje) => {
    if (puntaje < 59) {
      return "La dirección general presenta un bajo rendimiento, con deficiencias en la toma de decisiones y en la comunicación estratégica. Se recomienda una revisión profunda de los procesos de gestión y la implementación de una estrategia más cohesiva y orientada a resultados. Mejorar la comunicación interna y el liderazgo es crucial para el éxito.";
    } else if (puntaje >= 59 && puntaje < 82) {
      return "El rendimiento en dirección general es medio. Aunque la estrategia general está en marcha, hay áreas de mejora en la toma de decisiones y la implementación de estrategias. Considerar una revisión de los procesos de gestión y promover una mayor colaboración entre los equipos puede ser beneficioso.";
    } else if (puntaje >= 82 && puntaje < 100) {
      return "La dirección general muestra un buen desempeño con una estrategia clara y bien implementada. Sin embargo, siempre hay espacio para la mejora. Evaluar las áreas de oportunidad para afinar la toma de decisiones y fortalecer la comunicación interna puede mejorar aún más los resultados.";
    } else {
      return "La dirección general está funcionando a un nivel excelente, con una estrategia muy bien ejecutada y una toma de decisiones eficaz. Se recomienda seguir con las prácticas actuales y continuar buscando formas innovadoras de mejorar aún más la eficiencia y la comunicación.";
    }
  };

  const getMensajeAreaFinanzas = (puntaje) => {
    if (puntaje < 60) {
      return "El área de finanzas muestra un bajo rendimiento, con problemas significativos en la gestión de costos y presupuestos. Se recomienda una revisión exhaustiva de las prácticas financieras y una implementación de controles más estrictos para mejorar la rentabilidad.";
    } else if (puntaje >= 60 && puntaje < 83) {
      return "El área de finanzas presenta un desempeño medio. Aunque se están cumpliendo las expectativas básicas, hay oportunidades para optimizar la gestión de costos y presupuestos. Revisar y ajustar las estrategias financieras puede mejorar los resultados.";
    } else if (puntaje >= 83 && puntaje < 100) {
      return "El desempeño en el área de finanzas es bueno, pero siempre hay oportunidades para mejorar. Revisar los procesos actuales y buscar nuevas oportunidades para optimizar la gestión financiera puede contribuir a una mayor eficiencia.";
    } else {
      return "El área de finanzas está funcionando de manera excelente, con una gestión de costos y presupuestos muy efectiva. Continuar con las prácticas actuales y explorar nuevas estrategias para mantener y mejorar esta eficiencia es lo más recomendable.";
    }
  };

  const getMensajeTalentoHumano = (puntaje) => {
    if (puntaje < 60) {
      return "El área de talento humano muestra un bajo rendimiento, con problemas en la motivación y productividad del personal. Se recomienda implementar programas de desarrollo profesional y mejorar la comunicación y evaluación de desempeño para elevar el nivel de los empleados.";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "El desempeño en talento humano es medio. Existen algunas áreas de mejora en cuanto a la motivación y capacitación del personal. Mejorar los programas de formación y establecer un sistema de evaluación de desempeño más efectivo puede ser beneficioso.";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "El área de talento humano muestra un buen desempeño, pero siempre hay espacio para mejorar. Continuar con los programas de capacitación y evaluación del personal puede contribuir a una mayor motivación y productividad.";
    } else {
      return "El desempeño en talento humano es excelente. Los programas de formación y evaluación están funcionando muy bien, y el equipo está altamente motivado. Mantener estas prácticas y buscar nuevas oportunidades para seguir desarrollando al personal es lo más recomendable.";
    }
  };

  const getMensajeProduccionOperaciones = (puntaje) => {
    if (puntaje < 60) {
      return "La producción y operaciones muestran un bajo rendimiento, con ineficiencias significativas y problemas en la gestión de procesos. Se recomienda una revisión exhaustiva de los procesos operativos y una implementación de mejoras en la eficiencia y calidad.";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "El rendimiento en producción y operaciones es medio. Aunque se están cumpliendo los objetivos básicos, hay oportunidades para mejorar la eficiencia y reducir desperdicios. Revisar y ajustar los procesos operativos puede llevar a mejores resultados.";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "La producción y operaciones muestran un buen desempeño, pero siempre hay oportunidades para optimizar. Evaluar los procesos actuales y buscar formas de mejorar la eficiencia puede contribuir a un mejor rendimiento.";
    } else {
      return "La producción y operaciones están funcionando a un nivel excelente, con una alta eficiencia y calidad en los procesos. Continuar con las prácticas actuales y explorar nuevas oportunidades para mantener y mejorar este nivel es lo más recomendable.";
    }
  };

  const getMensajeTecnologiasInformacion = (puntaje) => {
    if (puntaje < 60) {
      return "La tecnología de la información muestra un bajo rendimiento, con deficiencias en la infraestructura y soporte. Se recomienda una revisión completa de la infraestructura tecnológica y una actualización de los sistemas para mejorar el rendimiento general.";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "El desempeño en tecnologías de información es medio. Aunque los sistemas actuales cumplen con las necesidades básicas, hay oportunidades para mejorar la infraestructura y el soporte técnico. Considerar una actualización tecnológica puede ser beneficioso.";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "La tecnología de la información muestra un buen desempeño, pero siempre hay oportunidades para mejorar. Revisar la infraestructura tecnológica y explorar nuevas soluciones puede ayudar a mantener y mejorar el rendimiento.";
    } else {
      return "Las tecnologías de información están funcionando a un nivel excelente, con una infraestructura sólida y un soporte técnico eficaz. Mantener estas prácticas y continuar explorando nuevas tecnologías para mantener el alto rendimiento es lo más recomendable.";
    }
  };

  const getMensajeInvestigacionDesarrollo = (puntaje) => {
    if (puntaje < 60) {
      return "La investigación y desarrollo muestran un bajo rendimiento, con una falta de innovación y avances significativos. Se recomienda una revisión de la estrategia de I+D y una mayor inversión en nuevas investigaciones para fomentar la innovación.";
    } else if (puntaje >= 60 && puntaje < 80) {
      return "El desempeño en investigación y desarrollo es medio. Aunque hay algunas iniciativas en marcha, hay oportunidades para aumentar la inversión y enfocar mejor los esfuerzos de I+D. Considerar una revisión de las estrategias actuales puede ser beneficioso.";
    } else if (puntaje >= 80 && puntaje < 100) {
      return "La investigación y desarrollo muestran un buen desempeño, con iniciativas y avances positivos. Sin embargo, siempre hay espacio para mejorar. Continuar con la inversión en I+D y explorar nuevas áreas de innovación puede llevar a mejores resultados.";
    } else {
      return "La investigación y desarrollo están funcionando a un nivel excelente, con innovaciones y avances significativos. Mantener las estrategias actuales y seguir invirtiendo en nuevas investigaciones es lo más recomendable para mantener el éxito.";
    }
  };
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelectSection={handleSectionChange} />
      {/* Main content */}
      <div className="flex-1 p-8 animated-gradient">
        <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C5234] mb-2">
              Resultados
            </CardTitle>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#4E9419]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Resultado empresarial es
            </motion.h2>
            <motion.div
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-[${colorg}] drop-shadow-lg`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
            >
              {totalEmpres}%
            </motion.div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <motion.div
                className="space-y-4 text-[#2C5234]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="font-semibold">
                  {getMensajeDesempenoGeneral(totalEmpres)}
                </p>
                <p>
                  <strong>Ventas y Marketing:</strong> {getMensajeVentasYMarketing(reaultPrueb1)}
                </p>
                <p>
                  <strong>Dirección General:</strong> {getMensajeDireccionGeneral(reaultPrueb2)}
                </p>
                <p>
                  <strong>Área de Finanzas:</strong> {getMensajeAreaFinanzas(reaultPrueb3)}
                </p>
                <p>
                  <strong>Talento Humano:</strong> {getMensajeTalentoHumano(reaultPrueb4)}
                </p>
                <p>
                  <strong>Producción y Operaciones</strong> {getMensajeProduccionOperaciones(reaultPrueb5)}
                </p>
                <p>
                  <strong>Tecnologías de la Información:</strong> {getMensajeTecnologiasInformacion(reaultPrueb6)}
                </p>
                <p>
                  <strong>Investigación y Desarrollo:</strong> {getMensajeInvestigacionDesarrollo(reaultPrueb7)}
                </p>
                <p>
                  {getMensajeResumen(totalEmpres)}
                </p>
              </motion.div>
            </ScrollArea>
            <motion.div
              className="mt-8 h-96"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FFF700" />
                      <stop offset="50%" stopColor="#4E9419" />
                      <stop offset="100%" stopColor="#2C5234" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    tick={{ fill: '#2C5234', fontWeight: 'bold' }}
                  />
                  <Tooltip />
                  <Bar dataKey="valor" shape={<CustomBar />}>
                    <LabelList content={<CustomLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center mt-6">
            <Button
              onClick={() => router.push('/InicioSeccion/admin/DiagnAd')}
              className="bg-[#4E9419] hover:bg-[#2C5234] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Regresar al Inicio
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InterfazResultados;











