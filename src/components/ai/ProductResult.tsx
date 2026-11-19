"use client";

import { Button } from "@/components/ui/button";

type ProductResultProps = {
  result: string;
};

export default function ProductResult({
  result,
}: ProductResultProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(result);

    alert("Hasil berhasil disalin!");
  }

  return (
    <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">
          Hasil Product AI
        </h2>

        <Button
          variant="outline"
          onClick={handleCopy}
        >
          Copy Hasil
        </Button>
      </div>

      <div className="whitespace-pre-wrap leading-7">
        {result}
      </div>
    </div>
  );
}
