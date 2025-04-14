'use client';

import { useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useForgotPasswordModal from '@/app/hooks/useForgotPasswordModal';

const ForgotPasswordModal = () => {
  const forgotPasswordModal = useForgotPasswordModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { email: '' }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Simulación de envío de link
      const response = await axios.post('/api/forgot-password', data);

      // El backend retorna un enlace simulado, lo mostramos en la UI
      if (response.data?.link) {
        toast.success('Revisa el enlace generado abajo');
        setResetLink(response.data.link);
      } else {
        toast.success('Revisa tu correo para restablecer');
      }

      // También podés cerrar el modal automáticamente si querés
      // forgotPasswordModal.onClose();
    } catch (error) {
      toast.error('No se pudo enviar el correo');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔄 Limpiar formulario al cerrar el modal
  useEffect(() => {
    if (!forgotPasswordModal.isOpen) {
      setTimeout(() => {
        reset(); // limpia el input de email
        setResetLink(null); // limpia el link
      }, 300); // da tiempo para cerrar el modal visualmente
    }
  }, [forgotPasswordModal.isOpen, reset]);

  const [resetLink, setResetLink] = useState<string | null>(null);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="¿Olvidaste tu contraseña?"
        subtitle="Te enviaremos un enlace para restablecerla"
      />
      <Input
        id="email"
        label="Correo electrónico"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {resetLink && (
        <div className="mt-4 bg-gray-100 p-3 rounded text-sm break-all">
          <strong>Link de recuperación:</strong><br />
          <a href={resetLink} className="text-blue-600 underline" target="_blank">
            {resetLink}
          </a>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={forgotPasswordModal.isOpen}
      title="Recuperar contraseña"
      actionLabel="Enviar enlace"
      onClose={forgotPasswordModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ForgotPasswordModal;
