"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();

    router.push("/login");
  }

  return (
    <header className="border-b p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="border rounded px-4 py-2"
      >
        Logout
      </button>
    </header>
  );
}
