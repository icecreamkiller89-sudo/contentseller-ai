"use client";

import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";

type CaptionResultProps = {
  shopee: string;
  tiktok: string;
  instagram: string;
  cta: string;
  hashtags: string;
};

export default function CaptionResult({
  shopee,
  tiktok,
  instagram,
  cta,
  hashtags,
}: CaptionResultProps) {
  const cleanText = (
    text: string
  ) =>
    text
      .replace(/^Tentu,\s*/i, "")
      .replace(/^Tentu\.?\s*/i, "")
      .replace(/^Berikut adalah\s*/i, "")
      .replace(/^Berikut\s*/i, "")
      .replace(/<\/?i>/gi, "")
      .replace(/<\/?b>/gi, "")
      .replace(/<\/?strong>/gi, "")
      .replace(/<\/?em>/gi, "");

  async function copyText(
    text: string
  ) {
    await navigator.clipboard.writeText(
      cleanText(text)
    );

    alert("Berhasil disalin");
  }

  function exportPDF(
    title: string,
    content: string
  ) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 20, 20);

    doc.setFontSize(12);

    const lines =
      doc.splitTextToSize(
        cleanText(content),
        170
      );

    doc.text(
      lines,
      20,
      35
    );

    doc.save(
      `${title}.pdf`
    );
  }

  function Section({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">
            {title}
          </h3>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                copyText(content)
              }
            >
              Copy
            </Button>

            <Button
              onClick={() =>
                exportPDF(
                  title,
                  content
                )
              }
            >
              PDF
            </Button>
          </div>
        </div>

        <div className="whitespace-pre-wrap leading-7">
          {cleanText(content)}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold">
        Hasil
      </h2>

      <Section
        title="Shopee"
        content={shopee}
      />

      <Section
        title="TikTok"
        content={tiktok}
      />

      <Section
        title="Instagram"
        content={instagram}
      />

      <Section
        title="CTA"
        content={cta}
      />

      <Section
        title="Hashtags"
        content={hashtags}
      />
    </div>
  );
}
