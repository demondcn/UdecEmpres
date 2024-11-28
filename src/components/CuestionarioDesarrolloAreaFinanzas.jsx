"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioDesarrolloAreaFinanzas = ({ onNavigate }) => {
  const [responses, setResponses] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  useEffect(() => {
    const shuffleArray = (array) => {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    const questions = [
      {
        number: 1,
        text: "¿Cuál es el nivel de automatización de los procesos financieros en la empresa?",
        options: [
          { value: "5", label: "Todos los procesos financieros están completamente automatizados, incluyendo la contabilidad, facturación y nómina" },
          { value: "3", label: "Algunos procesos financieros están semi-automatizados, como la emisión de facturas electrónicas, pero otros aún se realizan manualmente" },
          { value: "1", label: "Los procesos financieros son principalmente manuales y no se utiliza ninguna tecnología para agilizar o automatizar las tareas financieras" },
        ]
      },
      {
        number: 2,
        text: "¿La empresa cuenta con un sistema de contabilidad confiable y actualizado?",
        options: [
          { value: "5", label: "Sí, la empresa cuenta con un sistema de contabilidad confiable y actualizado" },
          { value: "3", label: "No puedo afirmarlo con certeza, hay algunas áreas en las que podemos mejorar la confiabilidad y actualización del sistema de contabilidad" },
          { value: "1", label: "No, la empresa no cuenta con un sistema de contabilidad confiable y actualizado" },
        ]
      },
      {
        number: 3,
        text: "¿Se realizan conciliaciones bancarias de forma regular y precisa?",
        options: [
          { value: "5", label: "Sí, se realizan conciliaciones bancarias de forma regular y precisa" },
          { value: "3", label: "A veces se realizan conciliaciones bancarias, pero no siempre son precisas" },
          { value: "1", label: "No se realizan conciliaciones bancarias de forma regular ni precisa" },
        ]
      },
      {
        number: 4,
        text: "¿Se generan informes financieros o estados financieros de manera oportuna y precisa?",
        options: [
          { value: "5", label: "Sí, se generan informes financieros o estados financieros de manera oportuna y precisa" },
          { value: "3", label: "A veces se generan informes financieros o estados financieros de manera oportuna y precisa" },
          { value: "1", label: "No se generan informes financieros o estados financieros de manera oportuna y precisa" },
        ]
      },
      {
        number: 5,
        text: "¿Se lleva a cabo una gestión eficiente de los flujos de efectivo y las finanzas a corto y largo plazo?",
        options: [
          { value: "5", label: "Sí, se cuenta con un sistema eficiente de administración financiera que se enfoca en optimizar los flujos de efectivo y las finanzas a corto y largo plazo" },
          { value: "3", label: "En cierta medida, se realizan esfuerzos para gestionar los flujos de efectivo y las finanzas a corto y largo plazo, pero existen áreas de mejora" },
          { value: "1", label: "No se cuenta con una gestión eficiente de los flujos de efectivo y las finanzas a corto y largo plazo, lo que afecta negativamente el funcionamiento del negocio" },
        ]
      },
      {
        number: 6,
        text: "¿Existen políticas claras y eficientes para la gestión de inventarios, compras y gastos?",
        options: [
          { value: "5", label: "Sí, existen políticas claras y bien definidas que optimizan la gestión de inventarios, compras y gastos" },
          { value: "3", label: "Sí, existen políticas, pero su eficiencia puede mejorar en la gestión de inventarios, compras y gastos" },
          { value: "1", label: "No, no existen políticas claras ni eficientes para la gestión de inventarios, compras y gastos" },
        ]
      },
      {
        number: 7,
        text: "¿Se realizan análisis de rentabilidad y eficiencia de los proyectos o inversiones de la empresa?",
        options: [
          { value: "5", label: "Sí, se realizan análisis detallados de rentabilidad y eficiencia de todos los proyectos o inversiones de la empresa" },
          { value: "3", label: "A veces se llevan a cabo análisis de rentabilidad y eficiencia de los proyectos o inversiones, pero no de manera consistente" },
          { value: "1", label: "No se realizan análisis de rentabilidad y eficiencia de los proyectos o inversiones de la empresa" },
        ]
      },
      {
        number: 8,
        text: "¿Se lleva un seguimiento de los indicadores financieros clave, como el retorno de la inversión (ROI) o el margen de rentabilidad?",
        options: [
          { value: "5", label: "Sí, se realiza un seguimiento riguroso de los indicadores financieros clave, incluyendo el ROI y el margen de rentabilidad" },
          { value: "3", label: "En cierta medida, se lleva a cabo un seguimiento de los indicadores financieros clave, pero no de manera completa" },
          { value: "1", label: "No se realiza un seguimiento de los indicadores financieros clave como el ROI o el margen de rentabilidad" },
        ]
      },
      {
        number: 9,
        text: "¿La empresa cuenta con un sistema de control interno eficiente para prevenir fraudes y errores financieros?",
        options: [
          { value: "5", label: "Sí, la empresa cuenta con un sistema de control interno totalmente eficiente y actualizado que previene fraudes y errores financieros de manera efectiva" },
          { value: "3", label: "Sí, la empresa cuenta con un sistema de control interno adecuado que ha demostrado ser efectivo en la prevención de fraudes y errores financieros, aunque puede haber margen de mejora" },
          { value: "1", label: "No, la empresa no cuenta con ningún tipo de sistema de control interno para prevenir fraudes y errores financieros" },
        ]
      },
      {
        number: 10,
        text: "¿Se realiza una adecuada planificación fiscal y cumplimiento de las obligaciones tributarias?",
        options: [
          { value: "5", label: "Sí, se realiza una planificación fiscal óptima y se cumplen meticulosamente todas las obligaciones tributarias" },
          { value: "3", label: "A veces se realiza una planificación fiscal adecuada y se cumplen la mayoría de las obligaciones tributarias" },
          { value: "1", label: "No, no se realiza una adecuada planificación fiscal y no se cumplen adecuadamente las obligaciones tributarias" },
        ]
      },
      {
        number: 11,
        text: "¿El área de Finanzas está involucrada en la toma de decisiones estratégicas de la empresa?",
        options: [
          { value: "5", label: "Sí, el área de Finanzas es clave en la toma de decisiones estratégicas de la empresa" },
          { value: "3", label: "En cierta medida, el área de Finanzas participa en la toma de decisiones estratégicas de la empresa" },
          { value: "1", label: "No, el área de Finanzas no está involucrada en la toma de decisiones estratégicas de la empresa" },
        ]
      },
      {
        number: 12,
        text: "¿Se fomenta una cultura de control y gestión financiera a todos los niveles de la organización?",
        options: [
          { value: "5", label: "Sí, se fomenta una cultura de control y gestión financiera en todos los niveles de la organización. Los empleados están capacitados en temas financieros y se les ofrece herramientas para tomar decisiones informadas" },
          { value: "3", label: "Se fomenta en cierta medida una cultura de control y gestión financiera en algunos niveles de la organización. Algunos empleados pueden tener conocimientos básicos en temas financieros, pero no existe un enfoque sistemático en toda la empresa" },
          { value: "1", label: "No se fomenta una cultura de control y gestión financiera en ninguno de los niveles de la organización. Los empleados carecen de conocimientos y herramientas financieras, lo que puede resultar en decisiones poco informadas y riesgos financieros" },
        ]
      }
    ];

    // Mezclar las opciones de cada pregunta al montar el componente
    const initializeQuestions = () => {
      const newQuestions = questions.map(question => ({
        ...question,
        options: shuffleArray(question.options),
      }));
      setShuffledQuestions(newQuestions);
    };

    initializeQuestions();
  }, []);
  useEffect(() => {
    // Verificar si todas las preguntas tienen una respuesta
    const allQuestionsAnswered = shuffledQuestions.every(question => responses[question.number]);
    setAllAnswered(allQuestionsAnswered);
  }, [responses, shuffledQuestions]);

  const handleResponseChange = (questionNumber, value) => {
    setResponses(prev => ({ ...prev, [questionNumber]: value }));
  };

  const calculatePercentage = () => {
    const values = Object.values(responses).map(Number);
    const total = values.reduce((acc, val) => acc + val, 0);

    const maxScore = 60; // Puntuación máxima posible: 10 preguntas con valor máximo de 3 cada una
    const percentage = (total / maxScore) * 100;

    return percentage;
  };

  const handleSubmit = () => {
    const percentage = calculatePercentage();
    onNavigate(percentage);
  };





  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5234] mb-2 break-words hyphens-auto flex items-center justify-center">
            <BarChart2 className="mr-2 h-8 w-8" />
            DESARROLLO DEL ÁREA DE FINANZAS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {shuffledQuestions.map((question) => (
                <motion.div
                  key={question.number}
                  className="space-y-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: question.number * 0.1 }}
                >
                  <h3 className="font-semibold text-[#2C5234]">{question.number}. {question.text}</h3>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <motion.div
                        key={option.value}
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >


                        <motion.div
                          className={`w-6 h-6 rounded-full border-2 border-[#4E9419] flex items-center justify-center cursor-pointer ${responses[question.number] === option.value ? 'bg-[#4E9419]' : 'bg-white'
                            }`}
                          onClick={() => handleResponseChange(question.number, option.value)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >

                          {responses[question.number] === option.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                        <Label
                          htmlFor={`q${question.number}-${option.value}`}
                          className="cursor-pointer"
                          onClick={() => handleResponseChange(question.number, option.value)}
                        >
                          {option.label}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              className="w-full mt-4 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={handleSubmit}
              disabled={!allAnswered} // Deshabilitar el botón si no están todas las respuestas
              style={{
                background: allAnswered
                  ? 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)'
                  : 'gray',
                backgroundSize: '400% 400%',
                animation: allAnswered ? 'gradientAnimation 15s ease infinite' : 'none',
              }}
            >
              Siguiente
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CuestionarioDesarrolloAreaFinanzas;