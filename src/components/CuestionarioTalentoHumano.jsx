"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioTalentoHumano = ({ onNavigate }) => {
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
        text: "¿Cuál es el nivel de participación de Recursos Humanos en la toma de decisiones estratégicas de la empresa?",
        options: [
          { value: "5", label: "Sí, Recursos Humanos desempeña un papel fundamental en las decisiones estratégicas y sus aportes son altamente valorados." },
          { value: "3", label: "Parcialmente, Recursos Humanos tiene cierta participación, pero no está completamente integrado en todas las decisiones." },
          { value: "1", label: "No, Recursos Humanos tiene una participación limitada y su influencia es mínima en las decisiones estratégicas." }
        ]
      },
      {
        number: 2,
        text: "¿Existe un plan estratégico de recursos humanos alineado con los objetivos y metas de la organización?",
        options: [
          { value: "5", label: "Sí, hay un plan estratégico de recursos humanos alineado y actualizado con los objetivos de la organización." },
          { value: "3", label: "Parcialmente, existe un plan que está alineado, pero necesita más ajuste o actualización." },
          { value: "1", label: "No, no hay un plan estratégico de recursos humanos alineado con los objetivos de la organización." }
        ]
      },
      {
        number: 3,
        text: "¿Qué medidas se han implementado para mejorar la retención de talento en la empresa?",
        options: [
          { value: "5", label: "Sí, se han implementado medidas efectivas para mejorar la retención de talento, como desarrollo profesional y beneficios competitivos." },
          { value: "3", label: "Parcialmente, hay algunas medidas que han tenido un impacto positivo, pero se requieren más esfuerzos." },
          { value: "1", label: "No, se han implementado medidas limitadas o ninguna para mejorar la retención de talento." }
        ]
      },
      {
        number: 4,
        text: "¿Se lleva a cabo una evaluación formal del desempeño de los empleados de manera regular?",
        options: [
          { value: "5", label: "Sí, se realizan evaluaciones formales de desempeño regularmente y se utilizan para decisiones de desarrollo y reconocimiento." },
          { value: "3", label: "A veces, se realizan evaluaciones, pero no de manera regular ni consistente." },
          { value: "1", label: "No, no se realizan evaluaciones formales de desempeño." }
        ]
      },
      {
        number: 5,
        text: "¿Cuál es el nivel de satisfacción de los empleados en temas de comunicación interna y clima laboral?",
        options: [
          { value: "5", label: "Alto, los empleados están muy satisfechos con la comunicación interna y el clima laboral." },
          { value: "3", label: "Razonable, hay satisfacción, pero con margen para mejoras." },
          { value: "1", label: "Bajo, la satisfacción es insatisfactoria y se requieren mejoras significativas." }
        ]
      },
      {
        number: 6,
        text: "¿Se han realizado esfuerzos para mejorar el proceso de reclutamiento y selección de personal?",
        options: [
          { value: "5", label: "Sí, se han implementado mejoras significativas en el reclutamiento y selección, incluyendo tecnología avanzada y optimización de prácticas." },
          { value: "3", label: "Parcialmente, se han hecho algunas mejoras, pero hay áreas que aún necesitan atención." },
          { value: "1", label: "No, no se han realizado esfuerzos significativos para mejorar el proceso de reclutamiento y selección." }
        ]
      },
      {
        number: 7,
        text: "¿Existe un plan de capacitación y desarrollo para los empleados de la organización?",
        options: [
          { value: "5", label: "Sí, hay un plan integral de capacitación y desarrollo que se actualiza regularmente para todos los empleados." },
          { value: "3", label: "Parcialmente, existen algunos programas, pero no son exhaustivos ni se actualizan con regularidad." },
          { value: "1", label: "No, no hay un plan estructurado de capacitación y desarrollo para los empleados." }
        ]
      },
      {
        number: 8,
        text: "¿Qué medidas se han tomado para promover el equilibrio entre trabajo y vida personal de los empleados?",
        options: [
          { value: "5", label: "Sí, se han implementado diversas medidas como horarios flexibles y programas de bienestar para promover el equilibrio trabajo-vida personal." },
          { value: "3", label: "Parcialmente, se han tomado algunas medidas, pero hay espacio para mejorar y ampliar las iniciativas." },
          { value: "1", label: "No, no se han tomado medidas significativas para promover el equilibrio trabajo-vida personal." }
        ]
      },
      {
        number: 9,
        text: "¿Cómo se mide el impacto de las acciones de Recursos Humanos en el rendimiento global de la empresa?",
        options: [
          { value: "5", label: "Sí, medimos exhaustivamente el impacto de Recursos Humanos utilizando KPIs específicos y análisis de datos." },
          { value: "3", label: "Parcialmente, hacemos algunas mediciones, pero no son completas ni sistemáticas y necesitan mejoras." },
          { value: "1", label: "No, no medimos el impacto de Recursos Humanos en el rendimiento de la empresa, lo que requiere atención urgente." }
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
    
    const maxScore = 45; // Puntuación máxima posible: 10 preguntas con valor máximo de 3 cada una
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
            Talento Humano
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

export default CuestionarioTalentoHumano;