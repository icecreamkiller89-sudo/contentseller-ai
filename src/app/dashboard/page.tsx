"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import StatsCard from "@/components/dashboard/StatsCard";

import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [productCount, setProductCount] =
    useState(0);

  const [captionCount, setCaptionCount] =
    useState(0);

  const [contentCount, setContentCount] =
    useState(0);

  const [totalCount, setTotalCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const { data, error } =
        await supabase
          .from("histories")
          .select("tool_name");

      if (error) {
        console.error(error);
        return;
      }

      const histories = data || [];

      setTotalCount(histories.length);

      setProductCount(
        histories.filter(
          (item) =>
            item.tool_name ===
            "Product AI"
        ).length
      );

      setCaptionCount(
        histories.filter(
          (item) =>
            item.tool_name ===
            "Caption AI"
        ).length
      );

      setContentCount(
        histories.filter(
          (item) =>
            item.tool_name ===
            "Content AI"
        ).length
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <AuthGuard>
      <main className="p-6 max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
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

        <h2 className="text-xl font-semibold mb-4">
          Statistik Generate
        </h2>

        {loading ? (
          <p>Loading statistik...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Product AI"
              value={productCount}
            />

            <StatsCard
              title="Caption AI"
              value={captionCount}
            />

            <StatsCard
              title="Content AI"
              value={contentCount}
            />

            <StatsCard
              title="Total Generate"
              value={totalCount}
            />
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">
          Tools AI
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">

          <Link
            href="/product-ai"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              Product AI
            </h2>

            <p>
              Generate deskripsi produk marketplace.
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
              Generate caption marketplace.
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
              Generate hook, script dan CTA.
            </p>
          </Link>

          <Link
            href="/profile"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              Profile
            </h2>

            <p>
              Lihat profil pengguna.
            </p>
          </Link>

          <Link
            href="/membership"
            className="border rounded-lg p-5 hover:bg-gray-50"
          >
            <h2 className="font-bold text-xl mb-2">
              Membership
            </h2>

            <p>
              Lihat paket dan limit penggunaan.
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
              Lihat seluruh riwayat generate AI.
            </p>
          </Link>

        </div>

      </main>
    </AuthGuard>
  );
}
