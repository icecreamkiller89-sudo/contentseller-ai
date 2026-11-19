import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Buatkan konten marketplace profesional.

Nama Produk:
${body.namaProduk}

Kategori:
${body.kategori}

Keunggulan:
${body.keunggulan}

Output dengan format:

1. Judul Produk
2. Deskripsi Produk
3. CTA Penjualan
4. 15 Hashtag
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    return Response.json({
      result: response.text,
    });
  } catch (error: any) {
    console.error(
      "FULL GEMINI ERROR:",
      JSON.stringify(error, null, 2)
    );

    return Response.json(
      {
        result:
          "Terjadi kesalahan saat menghubungi Gemini API.",
        error: error?.message ?? "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
