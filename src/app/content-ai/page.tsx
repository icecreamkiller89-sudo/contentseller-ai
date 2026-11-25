"use client";
import { checkDailyLimit } from "@/lib/usage";

import Link from "next/link";
import { useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import ContentResult from "@/components/ai/ContentResult";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

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
  const limitCheck =
    await checkDailyLimit();

  if (!limitCheck.allowed) {
    alert(limitCheck.message);

    return;
  }

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
            "Content AI",

          input_data:
            JSON.stringify({
              namaProduk,
              audience,
              platform,
              gayaKonten,
            }),

          output_data:
            JSON.stringify(data),
        }),
      }
    );
  } catch (error) {
    console.error(error);
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
            Content AI
          </h1>

          <div />
        </div>

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

          <Button
  onClick={handleGenerate}
  disabled={
    loading ||
    !namaProduk ||
    !audience ||
    !platform ||
    !gayaKonten
  }
>
  {loading
    ? "Generating..."
    : "Generate Content"}
</Button>

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
