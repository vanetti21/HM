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
      toast.error("Invalid token");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/reset-password", { token, password });
      toast.success("Password updated successfully");
      router.push("/"); 
    } catch (error) {
      toast.error("Error updating password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-10 mt-24 rounded-md text-white text-center bg-gradient-to-tr from-[#34495e] to-[#6e99c4] shadow-lg border">
      <h1 className="text-4xl font-extrabold mb-6">Reset Password</h1>
      <p className="text-lg mb-10">Please enter your new password below.</p>

      <div className="flex flex-col items-center gap-6">
        <input
          type="password"
          placeholder="New password"
          className="w-full max-w-sm px-4 py-2 rounded-md text-black border focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className=" hover:bg-blue-950 transition-colors text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </div>
    </main>
  );
}
