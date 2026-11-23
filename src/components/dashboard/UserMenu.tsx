"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

export default function UserMenu() {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [initials, setInitials] =
    useState("U");

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUser();

    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return;

    const emailName =
      user.email.split("@")[0];

    const initial =
      emailName
        .split(/[._-]/)
        .map((part) =>
          part.charAt(0)
        )
        .join("")
        .toUpperCase();

    setInitials(initial || "U");
  }

  async function handleLogout() {
    await signOut();

    router.push("/login");
  }

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <Link
            href="/profile"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            👤 Profile
          </Link>

          <Link
            href="/membership"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            💎 Membership
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}
