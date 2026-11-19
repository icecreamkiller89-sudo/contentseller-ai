"use client";

import { useState } from "react";

import AIResult from "@/components/ai/AIResult";
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
        const errorText =
          await response.text();

        throw new Error(errorText);
      }

      const data =
        await response.json();

      setResult(data.result);
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
    <main className="p-6">
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
            placeholder="Contoh: Sepatu Running Wanita"
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
            placeholder="Contoh: Kuat dan nyaman digunakan"
          />
        </div>

        {(!namaProduk ||
          !kategori ||
          !keunggulan) && (
          <p className="text-sm text-red-500">
            Lengkapi semua field sebelum generate.
          </p>
        )}

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
          <AIResult
            result={result}
          />
        )}
      </div>
    </main>
  );
}
