"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getLoggedInUser();

    // Allow public routes
    const publicRoutes = ["/login", "/signup", "/forgot-password"];

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname]);

  return <>{children}</>;
}
