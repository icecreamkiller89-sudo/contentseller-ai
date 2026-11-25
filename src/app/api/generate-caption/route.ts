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

WAJIB mengembalikan JSON valid.

Format:

{
  "shopee": "",
  "tiktok": "",
  "instagram": "",
  "cta": "",
  "hashtags": ""
}

Aturan :
- Jangan gunakan kata "Tentu"
- Jangan gunakan kalimat pembuka
- Jangan gunakan "Berikut adalah"
- Jangan gunakan sapaan
- Langsung tampilkan hasil caption
- Gunakan format yang rapi
- Jangan tambahkan markdown
- Jangan tambahkan \`\`\`json
- Jangan tambahkan penjelasan
- Jangan tambahkan teks lain
- Hanya tampilkan JSON
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });

    const rawText =
      response.text ?? "";

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(
      cleanedText
    );

    return Response.json(parsed);
  } catch (error: any) {
    console.error(
      "CAPTION AI ERROR:",
      error
    );

    return Response.json(
      {
        shopee: "",
        tiktok: "",
        instagram: "",
        cta: "",
        hashtags: "",
      },
      {
        status: 500,
      }
    );
  }
}
