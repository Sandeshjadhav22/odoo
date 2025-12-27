export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Admin Panel
      </h1>

      <p className="text-gray-600">
        Administrative controls and system settings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminCard
          title="Manage Teams"
          desc="Create, update, and delete teams"
        />
        <AdminCard
          title="Manage Users"
          desc="Assign roles and access"
        />
        <AdminCard
          title="System Settings"
          desc="Platform configuration"
        />
      </div>
    </div>
  );
}

function AdminCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {desc}
      </p>
    </div>
  );
}
