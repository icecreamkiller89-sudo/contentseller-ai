"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import { signOut } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <AuthGuard>
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Content Seller AI Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/product-ai"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              Product AI
            </h2>

            <p>
              Generate deskripsi produk dengan Gemini AI.
            </p>
          </Link>

          <Link
            href="/caption-ai"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              Caption AI
            </h2>

            <p>
              Generate caption Shopee, TikTok dan Instagram.
            </p>
          </Link>

          <Link
            href="/content-ai"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              Content AI
            </h2>

            <p>
              Generate Hook Viral, Script Video, CTA dan Hashtag.
            </p>
          </Link>

          <Link
            href="/history"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              History
            </h2>

            <p>
              Lihat riwayat hasil generate AI.
            </p>
          </Link>

        </div>
      </main>
    </AuthGuard>
  );
}
