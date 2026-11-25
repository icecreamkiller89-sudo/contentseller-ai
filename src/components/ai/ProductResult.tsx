"use client";

import { jsPDF } from "jspdf";

import { Button } from "@/components/ui/button";

type ProductResultProps = {
  result: string;
};

export default function ProductResult({
  result,
}: ProductResultProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(
      result
    );

    alert(
      "Hasil berhasil disalin!"
    );
  }

  function handleExportPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "Hasil Product AI",
      20,
      20
    );

    doc.setFontSize(12);

    const lines =
      doc.splitTextToSize(
        result,
        170
      );

    doc.text(
      lines,
      20,
      35
    );

    doc.save(
      "product-ai-result.pdf"
    );
  }
const cleanedResult = result
  .replace(
    /^Tentu,\s*/i,
    ""
  )
  .replace(
    /^Tentu\.?\s*/i,
    ""
  );

  return (
    <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm">

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">
          Hasil Konten
        </h2>

        <div className="flex gap-2">

          <Button
            variant="outline"
            onClick={handleCopy}
          >
            Copy Hasil
          </Button>

          <Button
            onClick={
              handleExportPDF
            }
          >
            Export PDF
          </Button>

        </div>
      </div>

      <div className="whitespace-pre-wrap leading-7">
        {cleanedResult}
      </div>

    </div>
  );
}

