"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import { supabase } from "@/lib/supabase";

type ProfileData = {
  email: string;
  id: string;
};

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [totalGenerate, setTotalGenerate] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setProfile({
        email: user.email || "",
        id: user.id,
      });

      const { data } = await supabase
        .from("histories")
        .select("id");

      setTotalGenerate(
        data?.length || 0
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Profile Saya
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                Email
              </h2>

              <p>
                {profile?.email}
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                User ID
              </h2>

              <p className="break-all">
                {profile?.id}
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                Total Generate
              </h2>

              <p>
                {totalGenerate}
              </p>
            </div>

            <div className="border rounded-lg p-5 shadow-sm">
              <h2 className="font-bold mb-2">
                Membership
              </h2>

              <p className="text-green-600 font-semibold">
                Free Plan
              </p>
            </div>

          </div>
        )}
      </main>
    </AuthGuard>
  );
}
