// PasswordResetDialog.js
import React from "react";
import { useForm } from "react-hook-form";

export default function PasswordResetDialog({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("/api/auth/reset-password-request", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Revisa tu correo para restablecer tu contraseña.");
      onClose(); // Cierra el diálogo
    } else {
      alert("Error al enviar el correo de restablecimiento.");
    }
  };

  if (!isOpen) return null; // No renderizar el diálogo si no está abierto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Restablecer contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            {...register("email", { required: true })}
            className="mb-4 p-2 border rounded w-full"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Enviar correo de restablecimiento
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500">
          Cerrar
        </button>
      </div>
    </div>
  );
}
