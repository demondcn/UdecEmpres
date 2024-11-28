"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioTecnologiasInformacion = ({ onNavigate }) => {
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
        text: "¿Cuál es el propósito principal de la función de Tecnologías de la Información en nuestra organización?",
        options: [
          { value: "5", label: "Óptima: El propósito principal de TI es impulsar la innovación, mejorar la eficiencia operativa y apoyar el crecimiento de la empresa con soluciones tecnológicas avanzadas." },
          { value: "3", label: "Media: TI busca mejorar la infraestructura y garantizar el funcionamiento de sistemas, pero hay oportunidades para aprovechar más su potencial estratégico." },
          { value: "1", label: "Baja: TI se enfoca en mantener la infraestructura existente sin contribuir de manera significativa a la estrategia, lo que requiere una revisión de su rol." },
        ]
      },
      {
        number: 2,
        text: "¿Qué estrategias se han implementado para alinear la TI con los objetivos comerciales de la empresa?",
        options: [
          { value: "5", label: "Óptima: Hemos implementado estrategias integrales que aseguran una total alineación de TI con los objetivos comerciales, con inversión estratégica en tecnología." },
          { value: "3", label: "Media: Hemos implementado algunas estrategias para alinear TI con los objetivos comerciales, pero aún hay áreas para mejorar esta alineación." },
          { value: "1", label: "Baja: No hemos implementado estrategias significativas para alinear TI con los objetivos comerciales, lo que requiere atención urgente." },
        ]
      },
      {
        number: 3,
        text: "¿Qué medidas se están tomando para garantizar la seguridad de la información y proteger los datos de la empresa?",
        options: [
          { value: "5", label: "Óptima: Hemos implementado un conjunto completo de medidas de seguridad de la información que cumplen con los más altos estándares." },
          { value: "3", label: "Media: Hemos tomado algunas medidas para proteger los datos, pero aún podemos fortalecer nuestras prácticas de seguridad." },
          { value: "1", label: "Baja: No hemos tomado medidas significativas para garantizar la seguridad de la información, lo que requiere una revisión urgente." },
        ]
      },
      {
        number: 4,
        text: "¿Cuáles son las principales inversiones en tecnología que se han realizado en los últimos años?",
        options: [
          { value: "5", label: "Óptima: Hemos hecho inversiones significativas en sistemas avanzados, infraestructura y tecnologías emergentes como IA e IoT." },
          { value: "3", label: "Media: Hemos realizado algunas actualizaciones en software y hardware, pero hay margen para más inversiones estratégicas." },
          { value: "1", label: "Baja: No hemos hecho inversiones significativas en tecnología, lo que requiere una revisión urgente de nuestra estrategia." },
        ]
      },
      {
        number: 5,
        text: "¿Cuál es el estado actual de la infraestructura tecnológica de la empresa? (redes, servidores, software, etc.)",
        options: [
          { value: "5", label: "Óptima: Nuestra infraestructura tecnológica está en excelente estado, con sistemas actualizados y servidores de vanguardia." },
          { value: "3", label: "Media: La infraestructura es aceptable, pero algunos sistemas necesitan actualizaciones y mejoras." },
          { value: "1", label: "Baja: La infraestructura es deficiente, con sistemas obsoletos y problemas de red, lo que requiere una inversión urgente." },
        ]
      },
      {
        number: 6,
        text: "¿Qué medidas se han tomado para garantizar la disponibilidad y el rendimiento de los sistemas informáticos?",
        options: [
          { value: "5", label: "Óptima: Se han implementado medidas exhaustivas para garantizar la disponibilidad y rendimiento óptimo de los sistemas, como redundancia y monitoreo constante." },
          { value: "3", label: "Media: Se han tomado algunas medidas, pero aún hay áreas que necesitan mejoras." },
          { value: "1", label: "Baja: No se han tomado medidas significativas, lo que representa un riesgo que requiere una revisión urgente." },
        ]
      },
      {
        number: 7,
        text: "¿Qué procesos de gestión de proyectos se están utilizando en el área de TI?",
        options: [
          { value: "5", label: "Óptima: Se implementan procesos de gestión de proyectos de clase mundial en TI, como enfoques ágiles y mejores prácticas PMI, asegurando la eficiencia." },
          { value: "3", label: "Media: Se utilizan algunos procesos de gestión de proyectos en TI, pero hay margen para adoptar enfoques más avanzados." },
          { value: "1", label: "Baja: No se aplican procesos significativos de gestión de proyectos en TI, lo que requiere una revisión urgente." },
        ]
      },
      {
        number: 8,
        text: "¿Cómo se mide y evalúa el rendimiento del área de TI?",
        options: [
          { value: "5", label: "Óptima: Se mide el rendimiento de TI de manera exhaustiva con KPIs alineados a los objetivos comerciales, evaluaciones internas y auditorías periódicas." },
          { value: "3", label: "Media: Se realiza alguna medición del rendimiento de TI, pero hay áreas para mejorar y adoptar enfoques más avanzados." },
          { value: "1", label: "Baja: No se mide ni evalúa significativamente el rendimiento de TI, lo que requiere una revisión urgente." },
        ]
      },
      {
        number: 9,
        text: "¿Qué planes y metas se tienen establecidos para el desarrollo futuro del área de TI?",
        options: [
          { value: "5", label: "Óptima: Hay planes y metas bien definidos para el desarrollo de TI, con inversiones estratégicas y objetivos claros alineados a la visión de la empresa." },
          { value: "3", label: "Media: Existen algunos planes para el desarrollo de TI, pero necesitan mejorar en definición y ejecución." },
          { value: "1", label: "Baja: No hay planes ni metas claras para el futuro desarrollo de TI, lo que requiere atención urgente." },
        ]
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

  // Modificar calculatePercentage en lugar de calculateAverage
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
            Tecnologias de la Información
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

export default CuestionarioTecnologiasInformacion;