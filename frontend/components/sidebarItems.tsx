import Link from 'next/link';

type Props = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export default function SidebarItem({
  href,
  label,
  icon,
}: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-200 hover:bg-gray-800 hover:text-white transition"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
