import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Buatkan konten marketing profesional.

Nama Produk:
${body.namaProduk}

Target Audience:
${body.audience}

Marketplace:
${body.marketplace}

Gaya Bahasa:
${body.gayaBahasa}

Buat output:

1. Caption Shopee
2. Caption TikTok Shop
3. Caption Instagram
4. CTA Penjualan
5. 15 Hashtag
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });

    return Response.json({
      result: response.text,
    });
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        result:
          "Terjadi kesalahan saat generate caption.",
      },
      {
        status: 500,
      }
    );
  }
}
