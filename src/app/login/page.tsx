"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn, signUp } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const { error } = await signIn(
        email,
        password
      );

      if (error) {
        alert(error.message);
        return;
      }

      alert("Login berhasil");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat login."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    try {
      setLoading(true);

      const { error } = await signUp(
        email,
        password
      );

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Registrasi berhasil."
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat registrasi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Login Content Seller AI
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            className="border rounded p-2 w-full"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            className="border rounded p-2 w-full"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            disabled={
              loading ||
              !email ||
              !password
            }
            className="border rounded px-4 py-2"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          <button
            onClick={handleRegister}
            disabled={
              loading ||
              !email ||
              !password
            }
            className="border rounded px-4 py-2"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
