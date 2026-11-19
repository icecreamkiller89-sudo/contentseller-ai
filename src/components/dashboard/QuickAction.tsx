import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";


export default function QuickAction() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-bold mb-4">
          Quick Actions
        </h3>

        <div className="space-y-2">
          <Link
  href="/product-ai"
  className="block w-full border rounded p-2 text-center"
>
  Product AI
</Link>

          <button className="w-full border rounded p-2">
            Caption AI
          </button>

          <button className="w-full border rounded p-2">
            Content AI
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

