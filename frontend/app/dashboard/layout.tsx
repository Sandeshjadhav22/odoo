import Link from 'next/link';
import Sidebar from '@/components/sidebar';
import SidebarItem from '@/components/sidebarItems';
import LogoutButton from '@/components/logoutButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-14 border-b flex items-center justify-between px-6 bg-white">
          <span className="font-medium">
            Dashboard
          </span>
          <LogoutButton />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
