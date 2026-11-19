"use client";

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
  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);

    alert("Berhasil disalin");
  }

  function Section({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">
            {title}
          </h3>

          <Button
            size="sm"
            onClick={() => copyText(content)}
          >
            Copy
          </Button>
        </div>

        <div className="whitespace-pre-wrap text-sm leading-6">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <Section
        title="Caption Shopee"
        content={shopee}
      />

      <Section
        title="Caption TikTok"
        content={tiktok}
      />

      <Section
        title="Caption Instagram"
        content={instagram}
      />

      <Section
        title="CTA Penjualan"
        content={cta}
      />

      <Section
        title="Hashtag"
        content={hashtags}
      />
    </div>
  );
}
