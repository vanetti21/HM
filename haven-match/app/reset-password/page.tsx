'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Token inválido");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/reset-password", { token, password });
      toast.success("Contraseña actualizada");
      router.push("/"); 
    } catch (error) {
      toast.error("Error al actualizar contraseña");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-20 gap-4">
      <h1 className="text-2xl font-bold">Restablecer contraseña</h1>
      <input
        type="password"
        placeholder="Nueva contraseña"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isSubmitting}
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Cambiar contraseña
      </button>
    </div>
  );
}
