"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog } from 'lucide-react';

export default function EditUserDialog({ isOpen, onOpenChange, id }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitEdit = async (data) => {
    try {
        // Enviar los datos al servidor
        const res = await fetch('/api/uptateInfoArea', {
          method: 'PUT',
          body: JSON.stringify({
            id,             // `id` del test
            result: data.result // Enviar el valor del resultado desde el formulario
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (res.ok) {
          const updatedTest = await res.json();
          console.log('Prueba actualizada:', updatedTest);
          reset(updatedTest);  // Resetear el formulario con los nuevos datos
          onOpenChange(false);  // Cerrar el diálogo
        } else {
          const errorText = await res.text();
          console.error('Error actualizando el resultado:', errorText);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#0034F5] text-white mr-2">
          <UserCog className="mr-1 h-4 w-4" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Área</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
          <div>
            <Label htmlFor="result">Resultado</Label>
            <Input
              id="result"
              placeholder="Cambiar Resultado"
              {...register('result', { required: true })}
              type="number"  // Tipo numérico para asegurar que el resultado sea un número
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#4E9419]">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

