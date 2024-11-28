"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioProduccionOperaciones = ({ onNavigate }) => {
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
        text: "¿Cuántos productos o servicios hemos ampliado o introducido al mercado en los últimos años?",
        options: [
          { value: "5", label: "Óptima: Hemos ampliado o introducido varios productos o servicios con éxito, contribuyendo significativamente al crecimiento de la empresa." },
          { value: "3", label: "Media: Hemos ampliado o introducido algunos productos o servicios, pero con un impacto limitado en el crecimiento." },
          { value: "1", label: "Baja: No hemos ampliado ni introducido nuevos productos o servicios, lo que requiere atención urgente." }
        ]
      },
      {
        number: 2,
        text: "¿Cuál ha sido el crecimiento porcentual de nuestra capacidad de producción en los últimos años?",
        options: [
          { value: "5", label: "Óptima: Hemos tenido un crecimiento significativo en la capacidad de producción, superando ampliamente las expectativas." },
          { value: "3", label: "Media: El crecimiento en la capacidad de producción ha sido moderado, en línea con las metas." },
          { value: "1", label: "Baja: El crecimiento ha sido limitado o nulo, lo que requiere una revisión urgente de las estrategias." }
        ]
      },
      {
        number: 3,
        text: "¿Cómo han mejorado nuestros tiempos de entrega y cumplimiento de pedidos?",
        options: [
          { value: "5", label: "Óptima: Los tiempos de entrega han mejorado significativamente y el cumplimiento de pedidos supera las expectativas." },
          { value: "3", label: "Media: Se han hecho mejoras, pero aún hay margen para mejorar y mantener la competitividad." },
          { value: "1", label: "Baja: No ha habido mejoras significativas en los tiempos de entrega y cumplimiento, lo que requiere una revisión urgente." }
        ]
      },
      {
        number: 4,
        text: "¿Cuántas nuevas tecnologías o herramientas hemos implementado en el área de producción u operaciones?",
        options: [
          { value: "5", label: "Óptima: Se han implementado múltiples tecnologías y herramientas que mejoran significativamente la eficiencia y competitividad." },
          { value: "3", label: "Media: Se han implementado algunas tecnologías, pero hay margen para más innovaciones." },
          { value: "1", label: "Baja: No se han implementado nuevas tecnologías, lo que requiere una revisión urgente de la estrategia tecnológica." }
        ]
      },
      {
        number: 5,
        text: "¿Cuál ha sido el porcentaje de reducción de costos en la producción?",
        options: [
          { value: "5", label: "Óptima: Hemos logrado una reducción de costos en la producción superior al 20%, lo que ha mejorado significativamente nuestra rentabilidad y eficiencia." },
          { value: "3", label: "Media: Hemos logrado una reducción de costos en la producción entre el 10% y el 20%, lo que representa un avance significativo pero aún hay margen para mejorar." },
          { value: "1", label: "Baja: No hemos logrado una reducción significativa de costos en la producción, lo que requiere una revisión urgente de nuestras estrategias de eficiencia." }
        ]
      },
      {
        number: 6,
        text: "¿Cómo hemos mejorado la eficiencia y productividad de nuestro personal en el área de producción u operaciones?",
        options: [
          { value: "5", label: "Óptima: Se han implementado medidas y capacitaciones que mejoran sustancialmente la eficiencia y productividad del personal." },
          { value: "3", label: "Media: Se han hecho algunas mejoras, pero aún hay áreas por desarrollar." },
          { value: "1", label: "Baja: No se han tomado medidas significativas, lo que requiere una revisión inmediata de las estrategias de gestión de personal." }
        ]
      },
      {
        number: 7,
        text: "¿Cuáles son los indicadores clave de rendimiento (KPI) que utilizamos para medir el desempeño del área de producción u operaciones?",
        options: [
          { value: "5", label: "Óptima: Utilizamos una amplia variedad de KPIs específicos y medibles que ofrecen una visión completa del desempeño del área de producción u operaciones." },
          { value: "3", label: "Media: Utilizamos algunos KPIs, pero hay oportunidades para ampliar y mejorar la medición." },
          { value: "1", label: "Baja: No utilizamos KPIs, lo que requiere una revisión urgente de nuestras prácticas de medición." }
        ]
      },
      {
        number: 8,
        text: "¿Hemos implementado prácticas de gestión de calidad y mejora continua en el área de producción u operaciones?",
        options: [
          { value: "5", label: "Óptima: Hemos implementado prácticas de gestión de calidad y mejora continua de manera integral, logrando alta eficiencia y calidad en nuestros procesos." },
          { value: "3", label: "Media: Hemos implementado algunas prácticas, pero hay áreas donde podemos fortalecer estas iniciativas." },
          { value: "1", label: "Baja: No hemos implementado prácticas significativas, lo que requiere atención inmediata para mejorar nuestros procesos." }
        ]
      },
      {
        number: 9,
        text: "¿Cómo hemos mejorado la seguridad y salud laboral en el área de producción u operaciones?",
        options: [
          { value: "5", label: "Óptima: Hemos implementado medidas exhaustivas que han mejorado significativamente la seguridad y salud laboral, alcanzando estándares excepcionales." },
          { value: "3", label: "Media: Hemos realizado mejoras, pero hay áreas donde podemos fortalecer nuestras prácticas." },
          { value: "1", label: "Baja: No hemos hecho mejoras significativas, lo que requiere atención urgente para garantizar la seguridad de nuestros empleados." }
        ]
      },
      {
        number: 10,
        text: "¿Qué acciones hemos tomado para reducir el impacto ambiental de nuestras operaciones de producción?",
        options: [
          { value: "5", label: "Óptima: Hemos implementado diversas acciones que han reducido significativamente el impacto ambiental, cumpliendo altos estándares de sostenibilidad." },
          { value: "3", label: "Media: Hemos tomado algunas acciones, pero hay margen para mejorar y alcanzar mayores niveles de sostenibilidad." },
          { value: "1", label: "Baja: No hemos tomado acciones significativas, lo que requiere una revisión urgente de nuestras prácticas ambientales." }
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
            Produccion y Operaciones
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

export default CuestionarioProduccionOperaciones;