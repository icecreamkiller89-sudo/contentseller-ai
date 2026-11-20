"use client";

import { useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import ContentResult from "@/components/ai/ContentResult";

export default function ContentAIPage() {
  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [namaProduk, setNamaProduk] =
    useState("");

  const [audience, setAudience] =
    useState("");

  const [platform, setPlatform] =
    useState("");

  const [gayaKonten, setGayaKonten] =
    useState("");

  async function handleGenerate() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/generate-content",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            namaProduk,
            audience,
            platform,
            gayaKonten,
          }),
        }
      );

      const data =
        await response.json();

      setResult(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Content AI
        </h1>

        <div className="space-y-4">

          <input
            className="border p-2 rounded w-full"
            placeholder="Nama Produk"
            value={namaProduk}
            onChange={(e) =>
              setNamaProduk(
                e.target.value
              )
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Target Audience"
            value={audience}
            onChange={(e) =>
              setAudience(
                e.target.value
              )
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Platform"
            value={platform}
            onChange={(e) =>
              setPlatform(
                e.target.value
              )
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Gaya Konten"
            value={gayaKonten}
            onChange={(e) =>
              setGayaKonten(
                e.target.value
              )
            }
          />

          <button
            onClick={handleGenerate}
            className="border px-4 py-2 rounded"
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Content"}
          </button>

          {result && (
            <ContentResult
              hook={result.hook}
              script={result.script}
              cta={result.cta}
              hashtags={result.hashtags}
            />
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
