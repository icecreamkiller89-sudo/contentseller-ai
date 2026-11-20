import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Nama Produk:
${body.namaProduk}

Target Audience:
${body.audience}

Platform:
${body.platform}

Gaya Konten:
${body.gayaKonten}

WAJIB mengembalikan JSON valid:

{
  "hook": "",
  "script": "",
  "cta": "",
  "hashtags": ""
}

Jangan gunakan markdown.
Jangan tambahkan penjelasan.
Hanya JSON.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });

    const text =
      (response.text ?? "")
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed =
      JSON.parse(text);

    return Response.json(parsed);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        hook: "",
        script: "",
        cta: "",
        hashtags: "",
      },
      {
        status: 500,
      }
    );
  }
}
