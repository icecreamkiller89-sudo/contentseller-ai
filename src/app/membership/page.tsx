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

  const [todayUsage, setTodayUsage] =
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

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const { data: historyData } =
        await supabase
          .from("histories")
          .select("id")
          .eq("user_id", user.id)
          .eq("generated_date", today);

      setTodayUsage(
        historyData?.length || 0
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } =
        await supabase
          .from("subscriptions")
          .update({
            plan: "PRO",
            daily_limit: 999999,
            price: 49000,
          })
          .eq("user_id", user.id);

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Selamat! Akun berhasil upgrade ke PRO."
      );

      loadData();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDowngrade() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } =
        await supabase
          .from("subscriptions")
          .update({
            plan: "FREE",
            daily_limit: 50,
            price: 0,
          })
          .eq("user_id", user.id);

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Akun berhasil kembali ke FREE."
      );

      loadData();
    } catch (error) {
      console.error(error);
    }
  }

  const limit =
    subscription?.daily_limit || 50;

  const remaining =
    Math.max(
      limit - todayUsage,
      0
    );

  const percentage =
    Math.min(
      (todayUsage / limit) * 100,
      100
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
              <h2 className="font-bold mb-4">
                Progress Penggunaan
              </h2>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm">
                {todayUsage} / {limit}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Generate Hari Ini
              </h2>

              <p>{todayUsage}</p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Daily Limit
              </h2>

              <p>{limit}</p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-bold mb-2">
                Sisa Generate
              </h2>

              <p>{remaining}</p>
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

            <div className="flex gap-3">
              {subscription?.plan ===
                "FREE" && (
                <button
                  onClick={
                    handleUpgrade
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Upgrade ke PRO
                </button>
              )}

              {subscription?.plan ===
                "PRO" && (
                <button
                  onClick={
                    handleDowngrade
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Kembali ke FREE
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </AuthGuard>
  );
}
