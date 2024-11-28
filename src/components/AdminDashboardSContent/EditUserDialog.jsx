"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog } from 'lucide-react';

export default function EditUserDialog({ isOpen, onOpenChange, id }) {
  const { register, handleSubmit, reset } = useForm()

  const onSubmitEdit = async (data) => {
    try {
      const res = await fetch('/api/uptateInfoUsers', {
        method: 'PUT',
        body: JSON.stringify( {data, id}),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const updatedUser = await res.json();
        console.log('Usuario actualizado:', updatedUser);
        reset(updatedUser);
        onOpenChange(false);
      } else {
        const errorText = await res.text(); // Captura el mensaje de error para depuración
        console.error('Error actualizando usuario:', errorText);
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
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input 
              id="name" 
              placeholder="Nombre completo" 
              {...register('name', { required: true })} 
            />
          </div>
          <div>
            <Label htmlFor="email">Correo</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="correo@ejemplo.com" 
              {...register('email', { required: true })} 
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
