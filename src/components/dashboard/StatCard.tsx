import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-gray-500">
          {title}
        </h3>

        <p className="text-2xl font-bold">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
