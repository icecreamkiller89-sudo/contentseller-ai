"use client";

import Link from "next/link";
import { useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import CaptionResult from "@/components/ai/CaptionResult";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase";

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
    useState<any>(null);

  async function handleGenerate() {
    try {
      setLoading(true);
      setResult(null);

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
              "Caption AI",

            input_data:
              JSON.stringify({
                namaProduk,
                audience,
                marketplace,
                gayaBahasa,
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
            Caption AI Gemini
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
              Target Audience
            </label>

            <Input
              value={audience}
              onChange={(e) =>
                setAudience(
                  e.target.value
                )
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
                setMarketplace(
                  e.target.value
                )
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
            disabled={
              loading ||
              !namaProduk ||
              !audience ||
              !marketplace ||
              !gayaBahasa
            }
          >
            {loading
              ? "Generating..."
              : "Generate Caption"}
          </Button>

          {result && (
            <CaptionResult
              shopee={result.shopee}
              tiktok={result.tiktok}
              instagram={result.instagram}
              cta={result.cta}
              hashtags={result.hashtags}
            />
          )}

        </div>

      </main>
    </AuthGuard>
  );
}
