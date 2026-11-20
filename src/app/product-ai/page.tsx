"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductResult from "@/components/ai/ProductResult";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


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

          tool_name: "Product AI",

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
      <h1 className="text-3xl font-bold mb-6">
        Product AI Gemini
      </h1>

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
  <>
    <div className="mt-6 border rounded-lg p-4 bg-green-50 border-green-200">
      <p className="font-semibold text-green-700">
        ✅ Konten berhasil dibuat dan disimpan ke History.
      </p>

      <div className="flex gap-3 mt-3">
        <a
          href="/dashboard"
          className="border rounded px-4 py-2 hover:bg-white"
        >
          Dashboard
        </a>

        <a
          href="/history"
          className="border rounded px-4 py-2 hover:bg-white"
        >
          History
        </a>
      </div>
    </div>

    <ProductResult
      result={result}
    />
  </>
        )}
      </div>
    </main>
    </AuthGuard>
  );
}
