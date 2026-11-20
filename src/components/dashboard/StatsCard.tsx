type StatsCardProps = {
  title: string;
  value: number;
};

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}
