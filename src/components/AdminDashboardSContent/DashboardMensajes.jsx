"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  Search,
  RefreshCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const DashboardMensajes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedMessage, setExpandedMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await fetch('/api/mensajes');
            if (!response.ok) {
              throw new Error('Error al cargar los mensajes');
            }
            const data = await response.json();
            setMessages(data);
          } catch (error) {
            console.error('Error fetching messages:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMessages();
      }, []);

  const toggleMessageExpansion = (messageId) => {
    setExpandedMessage(expandedMessage === messageId ? null : messageId);
  };

  const filteredMessages = messages.filter(message =>
    message.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Cargando mensajes...</p>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Mensajes</h3>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Búsqueda de Mensajes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="text-[#4E9419]" />
                <Input
                  type="text"
                  placeholder="Buscar por asunto o contenido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Lista de Mensajes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button className="bg-[#4E9419] text-white" onClick={() => router.refresh()}>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Actualizar
                </Button>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <Card key={message.id} className="bg-white shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="text-lg font-semibold text-[#2C5234]">{message.asunto}</h4>
                            <p className="text-sm text-gray-500">ID Usuario: {message.userId}</p>
                            <p className="text-sm text-gray-500">Fecha: {new Date(message.createdAt).toLocaleString()}</p>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => toggleMessageExpansion(message.id)}
                            className="text-[#4E9419]"
                          >
                            {expandedMessage === message.id ? <ChevronUp /> : <ChevronDown />}
                          </Button>
                        </div>
                        {expandedMessage === message.id && (
                          <div className="mt-4">
                            <p className="text-gray-700 whitespace-pre-wrap">{message.mensaje}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Estadísticas de Mensajes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <MessageCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Total de Mensajes</p>
                      <p className="text-[#4E9419]">{messages.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Mensajes Nuevos (Hoy)</p>
                      <p className="text-[#4E9419]">
                        {messages.filter(m => new Date(m.createdAt).toDateString() === new Date().toDateString()).length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Usuarios Únicos</p>
                      <p className="text-[#4E9419]">
                        {new Set(messages.map(m => m.userId)).size}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardMensajes;