"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();

    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="border rounded px-4 py-2"
    >
      Logout
    </button>
  );
}
