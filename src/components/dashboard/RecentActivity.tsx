import { Card, CardContent } from "@/components/ui/card";

export default function RecentActivity() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-bold mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-2">
          <li>✅ Caption Produk Sepatu</li>
          <li>✅ Konten TikTok Fashion</li>
          <li>✅ Deskripsi Produk Tas</li>
        </ul>
      </CardContent>
    </Card>
  );
}
