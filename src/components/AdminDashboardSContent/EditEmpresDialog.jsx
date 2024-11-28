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
    'nombre',
    'estado',
    'correoElectronico',
    'telefonos',
    'nombreContacto',
    'nit',
    'tipoEmpresa',
    'sector',
    'anoFundacion',
    'ubicacion',
    'ingresosAnuales',
    'activosTotales',
    'patrimonio',
    'numeroEmpleados',
    'canalesDistribucion',
    'principalesClientes',
    'tecnologiaUtilizada',
    'emailAuthorization'
  ];
  const onSubmitEdit = async (data) => {
    try {
      const res = await fetch('/api/updateEmpress', {
        method: 'PUT',
        body: JSON.stringify({ field: selectedField, value: fieldValue, id }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const updatedEmpres = await res.json();
        console.log('Empres actualizado:', updatedEmpres);
        reset(); // Reset form fields
        onOpenChange(false);
      } else {
        const errorText = await res.text();
        console.error('Error actualizando Empres:', errorText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
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
      <DialogTrigger asChild>
        <Button className="bg-[#0034F5] text-white mr-2">
          <UserCog className="mr-1 h-4 w-4" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
          <div>
            <Label htmlFor="selectedField">Seleccionar Campo</Label>
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
            <Label htmlFor="fieldValue">Nuevo Valor</Label>
            <Input
              id="fieldValue"
              placeholder="Ingrese nuevo valor"
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
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
