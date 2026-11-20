"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type HistoryItem = {
  id: number;
  tool_name: string;
  input_data: string;
  output_data: string;
  created_at: string;
};

export default function HistoryPage() {
  const [histories, setHistories] =
    useState<HistoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadHistories() {
    const { data, error } =
      await supabase
        .from("histories")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (!error && data) {
      setHistories(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadHistories();
  }, []);

  async function handleCopy(
    text: string
  ) {
    await navigator.clipboard.writeText(
      text
    );

    alert("Berhasil disalin");
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        History Generate
      </h1>

      {loading && (
        <p>Loading...</p>
      )}

      {!loading &&
        histories.length === 0 && (
          <p>
            Belum ada data history.
          </p>
        )}

      <div className="space-y-4">
        {histories.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="font-bold text-lg">
                  {item.tool_name}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    item.output_data
                  )
                }
                className="border rounded px-3 py-1"
              >
                Copy
              </button>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">
                Input
              </h3>

              <pre className="whitespace-pre-wrap text-sm">
                {item.input_data}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">
                Output
              </h3>

              <pre className="whitespace-pre-wrap text-sm">
                {item.output_data}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
