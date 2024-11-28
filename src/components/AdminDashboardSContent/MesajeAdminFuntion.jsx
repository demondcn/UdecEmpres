"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog } from 'lucide-react';

export default function EditUserDialog({ isOpen, onOpenChange, id }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selectedField, setSelectedField] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const fields = [
    'Problemas Con Registro Empresa',        
    'Problemas Con Registro Usuario',       
    'Problemas Con Inicio de Sesión',         
    'Problemas con la Plataforma',            
    'Problemas con la Recuperación de Contraseña', 
    'Problemas con la Verificación de Correo',
    'Ideas O Recomendaciones de Mejora',      
    'Solicitudes de Nuevas Funcionalidades',  
    'Problemas Con Integración de Servicios', 
    'Reportar Errores o Bugs',                
  ];
  const onSubmitEdit = async (data) => {
    try {
      const res = await fetch('/api/AddMessage', {
        method: 'POST',
        body: JSON.stringify({ field: selectedField, value: fieldValue, id }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const MensajeCreado = await res.json();
        console.log('Mensaje Enviado:', MensajeCreado);
        reset(); // Reset form fields
        onOpenChange(false);
      } else {
        const errorText = await res.text();
        console.error('Error Enviar Mensaje:', errorText);
      }
    } catch (error) {
      console.error('Error al enviar el Mensaje:', error);
    }
  };

  const watchedField = watch('selectedField');
  React.useEffect(() => {
    if (watchedField) {
      setSelectedField(watchedField);
    }
  }, [watchedField]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mensaje Soporte</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
          <div>
            <Label htmlFor="selectedField">Seleccionar El Campo de Su Mensaje</Label>
            <select
              id="selectedField"
              {...register('selectedField', { required: true })}
              onChange={(e) => {
                const field = e.target.value;
                setSelectedField(field);
                // Optionally, you could also set the field value here
                setValue('fieldValue', fieldValue || '');
              }}
              className="border p-2 rounded"
            >
              <option value="">Seleccione un campo</option>
              {fields.map((field) => (
                <option value={field} key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="fieldValue">Mensaje</Label>
            <Input
              id="fieldValue"
              placeholder="Ingrese su mensaje"
              {...register('fieldValue', { required: true })}
              onChange={(e) => setFieldValue(e.target.value)}
              value={fieldValue}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#4E9419]">
              Enviar Mensaje
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
