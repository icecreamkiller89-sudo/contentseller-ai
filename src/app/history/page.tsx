"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type HistoryItem = {
  id: number;
  user_id: string;
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

  const [filter, setFilter] =
    useState("All");

  async function loadHistories() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("FULL USER:", user);

      let query = supabase
        .from("histories")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (filter !== "All") {
        query = query.eq(
          "tool_name",
          filter
        );
      }

      const { data, error } =
        await query;

      console.log(
        "HISTORY DATA:",
        data
      );

      console.log(
        "HISTORY ERROR:",
        error
      );

      if (error) {
        console.error(error);
        return;
      }

      setHistories(data || []);
    } catch (error) {
      console.error(
        "LOAD HISTORY ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistories();
  }, [filter]);

  async function handleCopy(
    text: string
  ) {
    await navigator.clipboard.writeText(
      text
    );

    alert("Berhasil disalin");
  }

  async function handleDelete(
    id: number
  ) {
    const confirmDelete =
      confirm(
        "Yakin ingin menghapus history ini?"
      );

    if (!confirmDelete) return;

    const { error } =
      await supabase
        .from("histories")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    await loadHistories();
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          History Generate
        </h1>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
          className="border rounded px-3 py-2"
        >
          <option>All</option>
          <option>Product AI</option>
          <option>Caption AI</option>
        </select>
      </div>

      {loading && (
        <p>Loading...</p>
      )}

      {!loading &&
        histories.length === 0 && (
          <p>
            Belum ada history.
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

              <div className="flex gap-2">
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

                <button
                  onClick={() =>
                    handleDelete(
                      item.id
                    )
                  }
                  className="bg-red-500 text-white rounded px-3 py-1"
                >
                  Delete
                </button>
              </div>
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
