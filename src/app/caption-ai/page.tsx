"use client";

import { useState } from "react";

import AIResult from "@/components/ai/AIResult";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CaptionAIPage() {
  const [namaProduk, setNamaProduk] =
    useState("");

  const [audience, setAudience] =
    useState("");

  const [marketplace, setMarketplace] =
    useState("");

  const [gayaBahasa, setGayaBahasa] =
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
        "/api/generate-caption",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            namaProduk,
            audience,
            marketplace,
            gayaBahasa,
          }),
        }
      );

      const data =
        await response.json();

      setResult(data.result);
    } catch (error) {
      console.error(error);

      setResult(
        "Terjadi kesalahan saat generate caption."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Caption AI Gemini
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            Nama Produk
          </label>

          <Input
            value={namaProduk}
            onChange={(e) =>
              setNamaProduk(e.target.value)
            }
            placeholder="Contoh: Sepatu Running Pria"
          />
        </div>

        <div>
          <label className="block mb-2">
            Target Audience
          </label>

          <Input
            value={audience}
            onChange={(e) =>
              setAudience(e.target.value)
            }
            placeholder="Contoh: Pria usia 20-35 tahun"
          />
        </div>

        <div>
          <label className="block mb-2">
            Marketplace
          </label>

          <Input
            value={marketplace}
            onChange={(e) =>
              setMarketplace(e.target.value)
            }
            placeholder="Contoh: Shopee"
          />
        </div>

        <div>
          <label className="block mb-2">
            Gaya Bahasa
          </label>

          <Textarea
            value={gayaBahasa}
            onChange={(e) =>
              setGayaBahasa(
                e.target.value
              )
            }
            placeholder="Contoh: Soft Selling"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Caption"}
        </Button>

        {result && (
          <AIResult result={result} />
        )}
      </div>
    </main>
  );
}
