"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";


const CuestionarioVentasMark = ({ onNavigate }) => {
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
        text: "¿Se establecieron objetivos para el departamento de ventas y marketing durante el último año y se lograron cumplir?",
        options: [
          { value: "5", label: "Sí, se establecieron y cumplieron todos los objetivos" },
          { value: "3", label: "Parcialmente, se establecieron algunos objetivos, pero no se cumplieron todos" },
          { value: "1", label: "No, no se establecieron objetivos claros para ventas y marketing" },
        ],
      },
      {
        number: 2,
        text: "¿Se poseen estrategias de marketing utilizadas por el departamento encargado de mercadeo y ventas?",
        options: [
          { value: "5", label: "Sí, se implementan estrategias de marketing de manera eficiente" },
          { value: "3", label: "Parcialmente, hay estrategias de marketing, pero los resultados son regulares" },
          { value: "1", label: "No, no se cuenta con estrategias de marketing claras y efectivas" },
        ],
      },
      {
        number: 3,
        text: "¿Cómo definiría los resultados que ha obtenido el área de ventas y marketing?",
        options: [
          { value: "5", label: "Excelentes resultados" },
          { value: "3", label: "Resultados aceptables" },
          { value: "1", label: "Resultados insatisfactorios" },
        ],
      },
      {
        number: 4,
        text: "¿Cómo es la disposición y capacidad del equipo de ventas para alcanzar los objetivos establecidos?",
        options: [
          { value: "5", label: "Óptima: El equipo está motivado, capacitado y coordinado para alcanzar los objetivos" },
          { value: "3", label: "Media: El equipo tiene algunas habilidades, pero necesita mejorar en coordinación y motivación" },
          { value: "1", label: "Baja: El equipo carece de capacitación, motivación y coordinación, lo que afecta el logro de objetivos" },
        ],
      },
      {
        number: 5,
        text: "¿Cómo evalúa los procesos de generación de leads en mercadeo y ventas que se están utilizando actualmente?",
        options: [
          { value: "5", label: "Óptima: Los procesos generan un alto volumen de leads de calidad" },
          { value: "3", label: "Media: Los procesos son efectivos, pero requieren mejoras en cantidad y calidad de leads" },
          { value: "1", label: "Baja: Los procesos no funcionan bien, generando pocos leads de calidad" },
        ],
      },
      {
        number: 6,
        text: "¿En qué grado se utilizan las siguientes herramientas o tecnologías para automatizar y optimizar los procesos de ventas y marketing? Customer Relationship Management (CRM), Marketing Automation, Analytics y Business Intelligence, Chatbots y Asistentes Virtuales y Social Media Management.",
        options: [
          { value: "5", label: "Óptima: Altamente integrado y utilizado en todos los procesos de ventas y marketing" },
          { value: "3", label: "Media: Utilizado de forma moderada para algunas funciones específicas" },
          { value: "1", label: "Baja: Escasamente utilizado o no implementado en absoluto" },
        ],
      },
      {
        number: 7,
        text: "¿Se cuenta con un sistema de seguimiento y análisis de métricas de ventas y marketing?",
        options: [
          { value: "5", label: "Óptima: Contamos con un sistema completo y efectivo para seguimiento y análisis de métricas" },
          { value: "3", label: "Media: Tenemos un sistema, pero con áreas que requieren mejora en su implementación o eficacia" },
          { value: "1", label: "Baja: No contamos con un sistema formal o es limitado y poco efectivo en la toma de decisiones" },
        ],
      },
      {
        number: 8,
        text: "¿Se ofrecen capacitaciones y desarrollo profesional al equipo de ventas y marketing para mantenerse actualizado en las últimas tendencias y técnicas?",
        options: [
          { value: "5", label: "Óptima: Ofrecemos capacitaciones regulares y de calidad, manteniéndonos al día con las últimas tendencias y técnicas" },
          { value: "3", label: "Media: Ofrecemos algunas capacitaciones, pero no son tan frecuentes ni completas como deberían" },
          { value: "1", label: "Baja: No ofrecemos capacitaciones regulares o son insuficientes para estar actualizados" },
        ],
      },
      {
        number: 9,
        text: "¿Se asigna un presupuesto suficiente al departamento de ventas y marketing que permita lograr un buen desempeño e impacto en el medio?",
        options: [
          { value: "5", label: "Óptima: Sí, se asigna un presupuesto adecuado que permite implementar estrategias efectivas y tener un impacto significativo" },
          { value: "3", label: "Media: Sí, hay un presupuesto asignado, pero podría mejorarse para un mayor impacto y desempeño" },
          { value: "1", label: "Baja: No, el presupuesto es insuficiente, limitando la implementación de estrategias efectivas" },
        ],
      },
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
    
    const maxScore = 45; // La puntuación total máxima posible
    const percentage = (total / maxScore) * 100;
    
    
    return percentage;
  };
  
  const handleSubmit = () => {
    const percentage = calculatePercentage();
    onNavigate(percentage); // Enviar el porcentaje en lugar del promedio
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
            Ventas y Marketing
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
                          className={`w-6 h-6 rounded-full border-2 border-[#4E9419] flex items-center justify-center cursor-pointer ${
                            responses[question.number] === option.value ? 'bg-[#4E9419]' : 'bg-white'
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

export default CuestionarioVentasMark;