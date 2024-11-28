"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioInvestigacionDesarrollo = ({ onNavigate }) => {
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
        text: "¿Cuál es el objetivo principal del área de Investigación y Desarrollo (I+D) en nuestra organización?",
        options: [
          { value: "5", label: "Óptima: El área de I+D impulsa la innovación y desarrolla productos o servicios de vanguardia para liderar el mercado." },
          { value: "3", label: "Media: El área de I+D se centra en mejorar productos existentes, pero hay oportunidades para innovar más." },
          { value: "1", label: "Baja: El área de I+D carece de un objetivo claro y no contribuye significativamente a la innovación, lo que requiere una revisión urgente." },
        ],
      },
      {
        number: 2,
        text: "¿Cuáles son los proyectos de investigación y desarrollo actuales en los que está trabajando el equipo de I+D?",
        options: [
          { value: "5", label: "Óptima: El equipo de I+D trabaja en proyectos innovadores y estratégicos con gran potencial para transformar la industria." },
          { value: "3", label: "Media: El equipo de I+D está involucrado en proyectos importantes, aunque algunos son más rutinarios que estratégicos." },
          { value: "1", label: "Baja: El equipo de I+D no trabaja en proyectos significativos en este momento, lo que requiere una revisión de prioridades." },
        ],
      },
      {
        number: 3,
        text: "¿Qué recursos (humanos, tecnológicos, financieros) se han asignado al área de I+D?",
        options: [
          { value: "5", label: "Óptima: Se han asignado recursos significativos y de alta calidad, incluyendo un equipo talentoso, tecnología avanzada y sólida inversión financiera." },
          { value: "3", label: "Media: Se han asignado algunos recursos, aunque hay margen para aumentar la inversión y fortalecer el equipo y la tecnología." },
          { value: "1", label: "Baja: Los recursos son limitados o insuficientes, lo que obstaculiza nuestra capacidad de innovación y desarrollo." },
        ],
      },
      {
        number: 4,
        text: "¿Cuál es el presupuesto anual destinado a actividades de I+D?",
        options: [
          { value: "5", label: "Óptima: Hay un presupuesto anual significativo que permite llevar a cabo proyectos innovadores y estratégicos." },
          { value: "3", label: "Media: Contamos con un presupuesto, pero podría aumentar para respaldar proyectos más ambiciosos." },
          { value: "1", label: "Baja: El presupuesto es limitado o insuficiente, lo que podría restringir nuestra capacidad de innovación y desarrollo." },
        ],
      },
      {
        number: 5,
        text: "¿Existen procedimientos establecidos para el seguimiento y control de los proyectos de I+D? Si es así, ¿cómo se lleva a cabo este seguimiento?",
        options: [
          { value: "5", label: "Óptima: Existen procedimientos sólidos y efectivos con hitos claros, métricas de rendimiento y revisiones regulares." },
          { value: "3", label: "Media: Hay algunos procedimientos, pero se pueden mejorar en estructura y rigor." },
          { value: "1", label: "Baja: No hay procedimientos establecidos, lo que dificulta la gestión de los proyectos." },
        ],
      },
      {
        number: 6,
        text: "¿Qué metodologías se utilizan para la gestión de proyectos de I+D (por ejemplo, Agile, Waterfall)?",
        options: [
          { value: "5", label: "Óptima: Utilizamos metodologías avanzadas y ágiles (como Agile o Scrum) para una gestión eficiente y adaptable." },
          { value: "3", label: "Media: Empleamos algunas metodologías, pero podríamos diversificar y mejorar nuestra selección." },
          { value: "1", label: "Baja: No utilizamos metodologías específicas o dependemos de enfoques tradicionales, limitando nuestra innovación." },
        ],
      },
      {
        number: 7,
        text: "¿Cómo se promueve la colaboración y el intercambio de ideas entre el equipo de I+D y otros departamentos de la organización?",
        options: [
          { value: "5", label: "Óptima: Fomentamos activamente la colaboración a través de reuniones, proyectos conjuntos y una cultura de innovación abierta." },
          { value: "3", label: "Media: Hay algún grado de colaboración, pero se pueden mejorar las prácticas y procesos para promoverlo." },
          { value: "1", label: "Baja: La colaboración es limitada o inexistente, lo que obstaculiza la innovación y el desarrollo conjunto." },
        ],
      },
      {
        number: 8,
        text: "¿Se realizan análisis de competitividad y benchmarking en el área de I+D? ¿Cuáles han sido los principales hallazgos?",
        options: [
          { value: "5", label: "Óptima: Realizamos análisis de competitividad y benchmarking de manera regular, identificando oportunidades de mejora y manteniéndonos a la vanguardia en innovación." },
          { value: "3", label: "Media: Realizamos ocasionalmente análisis, pero podríamos ser más regulares para obtener mejores perspectivas del mercado." },
          { value: "1", label: "Baja: No realizamos análisis de competitividad ni benchmarking, limitando nuestra capacidad para evaluar nuestro desempeño y detectar áreas de mejora." },
        ],
      },
      {
        number: 9,
        text: "¿Se miden y evalúan los resultados y el impacto de las actividades de I+D? ¿Qué indicadores se utilizan?",
        options: [
          { value: "5", label: "Óptima: Medimos sistemáticamente los resultados e impacto de I+D con indicadores clave como ROI, tiempo de comercialización, número de patentes y satisfacción del cliente." },
          { value: "3", label: "Media: Realizamos algunas mediciones de resultados de I+D, pero podemos mejorar en la selección y seguimiento de indicadores." },
          { value: "1", label: "Baja: No medimos ni evaluamos sistemáticamente los resultados o impacto de I+D, dificultando la comprensión de su efectividad." },
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
    
    const maxScore = 45;
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
            Investigación y Desarrollo
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
              Ver Resultados
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CuestionarioInvestigacionDesarrollo;