"use client";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserX } from 'lucide-react';

export default function DeleteUserDialog({ isOpen, onOpenChange, id, testName}) {
  const handleDeleteUser = async () => {
      try {
          const res = await fetch('/api/DeleteTest', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id })  // Enviar el id en el cuerpo de la solicitud
          });

          if (res.ok) {
              console.log('Test eliminado');
              onOpenChange(false);  // Cierra el diálogo
          } else {
              console.error('Error eliminando Área');
          }
      } catch (error) {
          console.error('Error al eliminar el Área:', error);
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-white mr-2">
          <UserX className="mr-2 h-4 w-4" /> Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Área</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-center">
            ¿Estás seguro de eliminar este Área del diagnostico??
          </p>
          <p className="text-center font-semibold">
            {testName}
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Eliminar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}