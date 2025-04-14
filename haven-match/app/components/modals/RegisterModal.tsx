'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/UseRegisterModal';
import useLoginModal from '@/app/hooks/UseLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    // Validación extra: formato del email (aunque react-hook-form también lo hace)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error('Formato de correo inválido');
      setError('email', { type: 'manual', message: 'Formato de correo inválido' });
      setIsLoading(false);
      return;
    }

    try {
      // Verificamos si el correo ya está registrado
      const res = await axios.post('/api/check-email', { email: data.email });

      if (res.data.exists) {
        toast.error('Este correo ya está registrado');
        setError('email', { type: 'manual', message: 'Correo ya registrado' });
        setIsLoading(false);
        return;
      }

      // Continuamos con el registro
      await axios.post('/api/register', data);
      toast.success('¡Registro exitoso!');
      registerModal.onClose();
      loginModal.onOpen();

    } catch (error) {
      toast.error('Ocurrió un error al registrarse.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido a Haven Match"
        subtitle="¡Crea una cuenta!"
      />
      <Input 
        id="email"
        label="Correo electrónico"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

      <Input 
        id="name"
        label="Nombre"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        type="password"
        label="Contraseña"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continuar con Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continuar con Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>¿Ya tienes una cuenta?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Iniciar sesión
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registrarse"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;