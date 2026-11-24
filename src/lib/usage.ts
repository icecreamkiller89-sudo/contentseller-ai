import { supabase } from "./supabase";

export async function checkDailyLimit() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        allowed: false,
        message: "User belum login.",
      };
    }

    const { data: subscriptionData } =
      await supabase
        .from("subscriptions")
        .select("plan,daily_limit")
        .eq("user_id", user.id);

    if (
      !subscriptionData ||
      subscriptionData.length === 0
    ) {
      return {
        allowed: false,
        message:
          "Membership tidak ditemukan.",
      };
    }

    const subscription =
      subscriptionData[0];

    if (
      subscription.plan === "PRO"
    ) {
      return {
        allowed: true,
      };
    }

    const { data: historyData } =
      await supabase
        .from("histories")
        .select("id")
        .eq("user_id", user.id);

    const totalUsage =
      historyData?.length || 0;

    const limit =
      subscription.daily_limit || 50;

    console.log(
      "TOTAL USAGE:",
      totalUsage
    );

    console.log(
      "LIMIT:",
      limit
    );

    if (totalUsage >= limit) {
      return {
        allowed: false,

        message:
          `Limit penggunaan Anda sudah habis.\n\n` +
          `Plan: ${subscription.plan}\n` +
          `Limit: ${limit}\n\n` +
          `Silakan upgrade ke PRO.`,
      };
    }

    return {
      allowed: true,
    };
  } catch (error) {
    console.error(error);

    return {
      allowed: false,
      message:
        "Terjadi kesalahan saat mengecek limit.",
    };
  }
}
