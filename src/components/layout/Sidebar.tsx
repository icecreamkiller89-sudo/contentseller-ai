import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4">
      <h2 className="text-xl font-bold mb-6">
        Content Seller AI
      </h2>

      <nav className="space-y-3">
        <Link href="/dashboard" className="block">
          Dashboard
        </Link>

        <Link href="/product-ai" className="block">
          Product AI
        </Link>

        <Link href="/caption-ai" className="block">
          Caption AI
        </Link>

        <Link href="/content-ai" className="block">
          Content AI
        </Link>

        <Link href="/history" className="block">
          History
        </Link>
      </nav>
    </aside>
  );
}
