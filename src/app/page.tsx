import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="max-w-4xl text-center">

        <h1 className="text-6xl font-bold mb-6">
          ContentSeller AI
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          AI untuk Admin Olshop, Affiliate Marketer,
          dan Content Creator.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12 text-left">
          <div className="font-medium">
            ✅ Product AI
          </div>

          <div className="font-medium">
            ✅ Caption AI
          </div>

          <div className="font-medium">
            ✅ Content AI
          </div>

          <div className="font-medium">
            ✅ History & Statistik
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Mulai Gratis
          </Link>
        </div>

      </div>
    </main>
  );
}
