"use client";

import { Button } from "@/components/ui/button";

type AIResultProps = {
  result: string;
};

export default function AIResult({
  result,
}: AIResultProps) {
  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Berhasil disalin!");
  }

  return (
    <div className="mt-6 space-y-6">

      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">
            Hasil Gemini AI
          </h2>

          <Button
            variant="outline"
            onClick={() => copyText(result)}
          >
            Copy Semua
          </Button>
        </div>

        <div className="whitespace-pre-wrap leading-7">
          {result}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              Caption Shopee
            </h3>

            <Button
              size="sm"
              onClick={() => copyText(result)}
            >
              Copy
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Copy sementara seluruh hasil Gemini.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              Caption TikTok
            </h3>

            <Button
              size="sm"
              onClick={() => copyText(result)}
            >
              Copy
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Copy sementara seluruh hasil Gemini.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              Caption Instagram
            </h3>

            <Button
              size="sm"
              onClick={() => copyText(result)}
            >
              Copy
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Copy sementara seluruh hasil Gemini.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              Hashtag
            </h3>

            <Button
              size="sm"
              onClick={() => copyText(result)}
            >
              Copy
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Copy sementara seluruh hasil Gemini.
          </p>
        </div>

      </div>
    </div>
  );
}
