import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Anda adalah copywriter marketplace profesional.

Buatkan konten produk dengan format berikut:

1. Judul Produk

2. Deskripsi Produk

3. Keunggulan Produk

4. Spesifikasi Produk

5. Call To Action

PENTING:
- Jangan gunakan kata "Tentu"
- Jangan gunakan kalimat pembuka
- Jangan gunakan "Berikut adalah"
- Jangan gunakan sapaan apa pun
- Langsung mulai dari poin nomor 1
- Gunakan bahasa Indonesia profesional
- Gunakan format yang rapi dan mudah dibaca

Nama Produk:
${body.namaProduk}

Kategori:
${body.kategori}

Keunggulan:
${body.keunggulan}
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
