"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import { supabase } from "@/lib/supabase";

type Subscription = {
  plan: string;
  daily_limit: number;
};

export default function MembershipPage() {
  const [subscription, setSubscription] =
    useState<Subscription>({
      plan: "FREE",
      daily_limit: 50,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadMembership();
  }, []);

  async function loadMembership() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } =
        await supabase
          .from("subscriptions")
          .select("plan,daily_limit")
          .eq("user_id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      if (
        data &&
        data.length > 0
      ) {
        setSubscription({
          plan:
            data[0].plan ?? "FREE",

          daily_limit:
            data[0].daily_limit ?? 50,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleUpgrade() {
    alert(
      "Fitur Upgrade PRO akan tersedia pada versi berikutnya."
    );
  }

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

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                Current Plan
              </h2>

              <p className="text-xl font-semibold text-green-600">
                {subscription.plan}
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                Daily Limit
              </h2>

              <p>
                {subscription.daily_limit}
                {" "}
                Generate / Hari
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                Fitur Aktif
              </h2>

              <ul className="list-disc pl-6">
                <li>Product AI</li>
                <li>Caption AI</li>
                <li>Content AI</li>
                <li>History</li>
                <li>Dashboard Statistik</li>
              </ul>
            </div>

            <button
              onClick={handleUpgrade}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upgrade ke PRO
            </button>

          </div>
        )}
      </main>
    </AuthGuard>
  );
}
