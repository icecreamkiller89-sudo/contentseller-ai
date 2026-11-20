"use client";

import { Button } from "@/components/ui/button";

type Props = {
  hook: string;
  script: string;
  cta: string;
  hashtags: string;
};

export default function ContentResult({
  hook,
  script,
  cta,
  hashtags,
}: Props) {
  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Berhasil disalin");
  }

  function Card({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex justify-between mb-3">
          <h3 className="font-bold">
            {title}
          </h3>

          <Button
            size="sm"
            onClick={() =>
              copyText(content)
            }
          >
            Copy
          </Button>
        </div>

        <div className="whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <Card
        title="Hook Viral"
        content={hook}
      />

      <Card
        title="Script Video"
        content={script}
      />

      <Card
        title="CTA Penjualan"
        content={cta}
      />

      <Card
        title="Hashtag"
        content={hashtags}
      />
    </div>
  );
}
