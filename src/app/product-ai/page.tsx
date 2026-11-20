"use client";

import Link from "next/link";
import { useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import ProductResult from "@/components/ai/ProductResult";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase";

export default function ProductAIPage() {
  const [namaProduk, setNamaProduk] =
    useState("");

  const [kategori, setKategori] =
    useState("");

  const [keunggulan, setKeunggulan] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  async function handleGenerate() {
    try {
      setLoading(true);
      setResult("");

      const response = await fetch(
        "/api/generate-product",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            namaProduk,
            kategori,
            keunggulan,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal generate produk"
        );
      }

      const data =
        await response.json();

      setResult(data.result);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      await fetch(
        "/api/save-history",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            user_id: user?.id,

            tool_name:
              "Product AI",

            input_data:
              JSON.stringify({
                namaProduk,
                kategori,
                keunggulan,
              }),

            output_data:
              data.result,
          }),
        }
      );
    } catch (error) {
      console.error(error);

      setResult(
        "Terjadi kesalahan saat menghubungi Gemini AI."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="p-6 max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="border rounded px-4 py-2 hover:bg-gray-100"
          >
            ← Dashboard
          </Link>

          <h1 className="text-3xl font-bold">
            Product AI Gemini
          </h1>

          <div />
        </div>

        <div className="space-y-4">

          <div>
            <label className="block mb-2">
              Nama Produk
            </label>

            <Input
              value={namaProduk}
              onChange={(e) =>
                setNamaProduk(
                  e.target.value
                )
              }
              placeholder="Contoh: Sepatu Running Pria"
            />
          </div>

          <div>
            <label className="block mb-2">
              Kategori
            </label>

            <Input
              value={kategori}
              onChange={(e) =>
                setKategori(
                  e.target.value
                )
              }
              placeholder="Contoh: Fashion"
            />
          </div>

          <div>
            <label className="block mb-2">
              Keunggulan Produk
            </label>

            <Textarea
              value={keunggulan}
              onChange={(e) =>
                setKeunggulan(
                  e.target.value
                )
              }
              placeholder="Contoh: Ringan dan nyaman digunakan"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={
              loading ||
              !namaProduk ||
              !kategori ||
              !keunggulan
            }
          >
            {loading
              ? "Generating..."
              : "Generate Dengan Gemini"}
          </Button>

          {result && (
            <ProductResult
              result={result}
            />
          )}

        </div>

      </main>
    </AuthGuard>
  );
}
