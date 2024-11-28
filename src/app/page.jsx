"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { signIn, getSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

const Inicio = () => {
  const { register: registerRegister, handleSubmit: handleSubmitRegister, reset: resetRegister, formState: { errors: errorsRegister } } = useForm()
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const onSubmitRegister = async (data) => {
    try {
      const res = await fetch('/api/auth/registro', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) throw new Error('Error en el registro')
      resetRegister()
      setIsLogin(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error en el registro. Por favor, inténtelo de nuevo.')
    }
  }

  const onSubmitLogin = async (data) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (res.error) {
        throw new Error(res.error)
      }

      const session = await getSession()
      if (session && session.user) {
        if (session.user.isAdmin) {
          window.location.replace(`/InicioSeccion/admin/InicioAd`)
        } else {
          window.location.replace(`/InicioSeccion/usuario`)
        }
      } else {
        throw new Error("No se pudo obtener la sesión del usuario.")
      }
    } catch (error) {
      console.error('Error:', error)
      alert(error.message)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(-45deg, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <div className="bg-[#21313C] rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
        <motion.div
          className="w-1/2 p-8 relative"
          initial={{ x: isLogin ? 0 : '100%' }}
          animate={{ x: isLogin ? 0 : '100%' }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/934998f8-8c24-41fd-bf88-93a6fc55d9fc-8exqPk7JrayPcJsRekohG0YpSGQP9W.jpg"
              alt="Empres 360 Pro Logo"
              width={180}
              height={75}
              className="object-contain"
            />
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-green-500 mb-6">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <form onSubmit={isLogin ? handleSubmitLogin(onSubmitLogin) : handleSubmitRegister(onSubmitRegister)} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-2 pl-10 rounded-xl border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...registerRegister("name", { required: "El nombre es requerido" })}
                  />
                  {errorsRegister.name && <p className="text-red-500 text-xs mt-1">{errorsRegister.name.message}</p>}
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Correo"
                  className="w-full p-2 pl-10 rounded-xl border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...(isLogin ? registerLogin : registerRegister)("email", { 
                    required: "El correo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo inválido"
                    }
                  })}
                />
                {(isLogin ? errorsLogin.email : errorsRegister.email) && 
                  <p className="text-red-500 text-xs mt-1">{isLogin ? errorsLogin.email.message : errorsRegister.email.message}</p>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full p-2 pl-10 pr-10 rounded-xl border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...(isLogin ? registerLogin : registerRegister)("password", { 
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {(isLogin ? errorsLogin.password : errorsRegister.password) && 
                  <p className="text-red-500 text-xs mt-1">{isLogin ? errorsLogin.password.message : errorsRegister.password.message}</p>}
              </div>
              {isLogin && (
                <a href="/InicioSeccion/ResetConta" className="text-sm text-gray-300 hover:text-green-500 transition duration-300">
                  ¿Perdiste tu contraseña?
                </a>
              )}
              <button className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                {isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </button>
            </form>
          </div>
        </motion.div>
        <motion.div
          className="w-1/2 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-16 px-12 relative overflow-hidden"
          initial={{ x: isLogin ? 0 : '-100%' }}
          animate={{ x: isLogin ? 0 : '-100%' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 relative z-10">
            {isLogin ? '¡Hola!' : '¡Bienvenido!'}
          </h2>
          <div className="border-2 w-10 border-white inline-block mb-4 relative z-10"></div>
          <p className="mb-10 relative z-10 text-lg">
            {isLogin
              ? 'Introduce tus datos personales y comienza a llevar tu empresa al siguiente nivel.'
              : 'Impulse el rendimiento de su empresa. Regístrate hoy y aprovecha esta oportunidad para llevar tu empresa al siguiente nivel.'}
          </p>
          <button
            className="border-2 border-white rounded-xl px-12 py-3 inline-block font-semibold hover:bg-white hover:text-green-500 transition duration-300 relative z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Inicio