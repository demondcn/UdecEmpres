"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSignature } from 'lucide-react';


export default function NewDiagnosticDialog({ isOpen, onOpenChange, onSubmit }) {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const handleNewDiagnostic = async (e) => {
    e.preventDefault();

    try {
      // Convertir la fecha de string a un objeto Date
      const createdAtDate = new Date(createdAt);
      const response = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, status, createdAt: createdAtDate }),
      });

      if (!response.ok) {
        throw new Error('Failed to create diagnostic');
      }

      const { id } = await response.json();

      const response2 = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnosisId: id, number: 1 }),
      });

      if (!response2.ok) {
        throw new Error('Failed to create test');
      }
      onOpenChange(false);

      console.log("Diagnostic and test created successfully");
    } catch (error) {
      console.error('Error creating diagnostic:', error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#4E9419] text-white">
          <FileSignature className="mr-2 h-4 w-4" /> Nuevo Diagnóstico
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Diagnóstico</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleNewDiagnostic} className="space-y-4">
          <div>
            <Label htmlFor="userId">Id del Usuario a Agregar</Label>
            <Input
              id="userId"
              placeholder="87"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="createdAt">Fecha Creación</Label>
            <Input
              id="createdAt"
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completate">Completado</SelectItem>
                <SelectItem value="Pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="bg-[#4E9419] w-full">Crear Diagnóstico</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

