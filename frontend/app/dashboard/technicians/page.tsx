
export default function TechnicianPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Technician Dashboard
      </h1>

      <p className="text-gray-600">
        Your assigned maintenance tasks.
      </p>

      <div className="space-y-4">
        <Task title="Inspect HVAC Unit" />
        <Task title="Replace Filter - Block A" />
        <Task title="Routine Maintenance - Floor 2" />
      </div>
    </div>
  );
}

function Task({ title }: { title: string }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">
        Status: Pending
      </p>
    </div>
  );
}
