"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import { supabase } from "@/lib/supabase";

type Subscription = {
  plan: string;
  daily_limit: number;
  price: number;
};

export default function MembershipPage() {
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  const [totalGenerate, setTotalGenerate] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: subData } =
        await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id);

      if (
        subData &&
        subData.length > 0
      ) {
        setSubscription(subData[0]);
      }

      const { data: historyData } =
        await supabase
          .from("histories")
          .select("id")
          .eq("user_id", user.id);

      setTotalGenerate(
        historyData?.length || 0
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleUpgrade() {
    alert(
      "Integrasi pembayaran akan tersedia pada versi berikutnya."
    );
  }

  const limit =
    subscription?.daily_limit || 50;

  const remaining =
    Math.max(
      limit - totalGenerate,
      0
    );

  return (
    <AuthGuard>
      <main className="p-6 max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="border rounded px-4 py-2 hover:bg-gray-100"
          >
            ← Dashboard
          </Link>

          <h1 className="text-3xl font-bold">
            Membership Saya
          </h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Current Plan
              </h2>

              <p className="text-2xl font-bold text-green-600">
                {subscription?.plan}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Generate Digunakan
              </h2>

              <p>
                {totalGenerate}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Daily Limit
              </h2>

              <p>
                {limit}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Sisa Generate
              </h2>

              <p>
                {remaining}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Harga Paket
              </h2>

              <p>
                Rp{" "}
                {subscription?.price?.toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            {subscription?.plan ===
              "FREE" && (
              <button
                onClick={handleUpgrade}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Upgrade ke PRO
              </button>
            )}

          </div>
        )}
      </main>
    </AuthGuard>
  );
}