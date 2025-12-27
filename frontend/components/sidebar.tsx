import SidebarItem from '@/components/sidebarItems';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">
          Maintenance Portal
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {/* Operations */}
        <div>
          <p className="px-3 mb-2 text-xs text-gray-400 uppercase">
            Operations
          </p>
          <SidebarItem
            href="/dashboard"
            label="Maintenance Calendar"
            icon="🗓️"
          />
          <SidebarItem
            href="/dashboard/teams"
            label="Teams"
            icon="👥"
          />
          <SidebarItem
            href="/dashboard/technicians"
            label="Technicians"
            icon="🧑‍🔧"
          />
          <SidebarItem
            href="/dashboard/equipments"
            label="Equipments"
            icon="🔧"
          />
        </div>

        {/* Management */}
        <div>
          <p className="px-3 mb-2 text-xs text-gray-400 uppercase">
            Management
          </p>
          <SidebarItem
            href="/dashboard/users"
            label="Users"
            icon="👤"
          />
          <SidebarItem
            href="/dashboard/admin"
            label="Admin"
            icon="🛡️"
          />
          <SidebarItem
            href="/dashboard/reporting"
            label="Reporting"
            icon="📊"
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800 text-xs text-gray-400">
        © 2025 Maintenance System
      </div>
    </aside>
  );
}
