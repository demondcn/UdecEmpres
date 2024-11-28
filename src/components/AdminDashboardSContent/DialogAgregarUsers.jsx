"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from 'lucide-react';

export default function NewUserDialog({ isOpen, onOpenChange }) {
  const { register, handleSubmit, reset } = useForm()
  const onSubmitRegister = async (data) => {
    try {
      const res = await fetch('/api/auth/registro', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const user = await res.json();
        console.log('Usuario creado:', user);
        reset();  // Reinicia el formulario después de crear el usuario
        onOpenChange(false);  // Cierra el diálogo
      } else {
        console.error('Error creando usuario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#4E9419] text-white">
          <UserPlus className="mr-2 h-4 w-4" /> Nuevo Usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Nombre completo" {...register('name', { required: true })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" {...register('email', { required: true })} />
          </div>
          <div>
            <Label htmlFor="email">Contraseña</Label>
            <Input id="password" type="password" placeholder="******" {...register('password', { required: true })} />
          </div>
          <Button type="submit" className="bg-[#4E9419] w-full">Crear Usuario</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
