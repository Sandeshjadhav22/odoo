export default function UserPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        User Profile
      </h1>

      <div className="border rounded-lg p-4 bg-white space-y-2">
        <p>
          <strong>Name:</strong> —
        </p>
        <p>
          <strong>Email:</strong> —
        </p>
        <p>
          <strong>Role:</strong> —
        </p>
      </div>

      <p className="text-sm text-gray-500">
        User details will be loaded here.
      </p>
    </div>
  );
}
