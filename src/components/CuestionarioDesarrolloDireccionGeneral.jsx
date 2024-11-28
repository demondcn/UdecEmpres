"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioDesarrolloDireccionGeneral = ({ onNavigate }) => {
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
        text: "¿Cuál es la visión y misión de la empresa? ¿Son conocidas y compartidas por todos los miembros del equipo directivo?",
        options: [
          { value: "5", label: "Sí, todos los miembros del equipo directivo conocen y comparten la visión y misión." },
          { value: "3", label: "Parcialmente, algunos miembros las conocen y comparten, pero no todos." },
          { value: "1", label: "No, la visión y misión no son conocidas ni compartidas por el equipo directivo." },
        ]
      },
      {
        number: 2,
        text: "¿Existe un plan estratégico establecido? ¿Ha sido comunicado y se está implementando de manera efectiva?",
        options: [
          { value: "5", label: "Sí, el plan estratégico está claro, comunicado y se implementa efectivamente." },
          { value: "3", label: "Sí, pero no ha sido totalmente comunicado o implementado." },
          { value: "1", label: "No, no existe un plan estratégico establecido ni implementado." },
        ]
      },
      {
        number: 3,
        text: "¿Existe un plan estratégico consensuado con los directivos de la empresa que se proyecta en un horizonte de tiempo de 3 a 5 años y está actualizado?",
        options: [
          { value: "5", label: "Sí, hay un plan estratégico consensuado a 3-5 años y está actualizado." },
          { value: "3", label: "Sí, pero no tiene un horizonte de 3-5 años o no está totalmente actualizado." },
          { value: "1", label: "No, no hay un plan estratégico consensuado o está desactualizado." },
        ]
      },
      {
        number: 4,
        text: "¿Cómo se toman las decisiones estratégicas en la organización? ¿Se sigue un proceso estructurado y participativo?",
        options: [
          { value: "5", label: "Se sigue un proceso estructurado y participativo." },
          { value: "3", label: "A veces se sigue un proceso estructurado y participativo." },
          { value: "1", label: "No se sigue un proceso estructurado y participativo." },
        ]
      },
      {
        number: 5,
        text: "¿Se fomenta y promueve la innovación en la organización? ¿Se implementan nuevas ideas y propuestas?",
        options: [
          { value: "5", label: "Sí, se promueve activamente la innovación y el desarrollo de nuevas ideas." },
          { value: "3", label: "A veces, se fomenta la innovación, pero no de manera constante." },
          { value: "1", label: "No, no se promueve ni implementan nuevas ideas." },
        ]
      },
      {
        number: 6,
        text: "¿Existen indicadores clave de desempeño (KPIs) establecidos para medir el éxito de la estrategia y los procesos directivos?",
        options: [
          { value: "5", label: "Sí, hay KPIs claros y medibles para evaluar el éxito de la estrategia." },
          { value: "3", label: "Sí, pero los KPIs podrían ser más específicos y medibles." },
          { value: "1", label: "No, no hay KPIs establecidos para evaluar el éxito." },
        ]
      },
      {
        number: 7,
        text: "¿Se realizan reuniones periódicas con el equipo directivo para abordar temas estratégicos y evaluar el progreso?",
        options: [
          { value: "5", label: "Sí, se realizan reuniones periódicas para temas estratégicos y evaluar el progreso." },
          { value: "3", label: "A veces, se realizan reuniones, pero no de manera constante." },
          { value: "1", label: "No, no se realizan reuniones periódicas para estos temas." },
        ]
      },
      {
        number: 8,
        text: "¿Se fomenta el desarrollo y crecimiento de las habilidades directivas dentro del equipo?",
        options: [
          { value: "5", label: "Sí, se fomenta activamente el desarrollo de habilidades directivas." },
          { value: "3", label: "En parte, se ofrecen oportunidades de desarrollo, pero limitadas." },
          { value: "1", label: "No, el desarrollo de habilidades directivas no es una prioridad." },
        ]
      },
      {
        number: 9,
        text: "¿Se han establecido mecanismos de seguimiento y evaluación del desempeño del área de Dirección General?",
        options: [
          { value: "5", label: "Sí, hay mecanismos de seguimiento y evaluación efectivos para Dirección General." },
          { value: "3", label: "Sí, pero los mecanismos podrían mejorarse." },
          { value: "1", label: "No, no hay mecanismos de seguimiento y evaluación establecidos." },
        ]
      },
      {
        number: 10,
        text: "¿Cómo se ha implementado la mejora continua en los procesos directivos de la organización?",
        options: [
          { value: "5", label: "Sí, hay sistemas de gestión de calidad, como ISO 9001, y auditorías periódicas para la mejora continua." },
          { value: "3", label: "Parcialmente, hay iniciativas de mejora continua, pero sin un sistema formal ni auditorías." },
          { value: "1", label: "No, no se ha implementado ninguna mejora continua en los procesos directivos." },
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
    const maxScore = 50; // Puntuación máxima posible: 10 preguntas con valor máximo de 3 cada una
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
            DESARROLLO DE LA DIRECCIÓN GENERAL
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

export default CuestionarioDesarrolloDireccionGeneral;