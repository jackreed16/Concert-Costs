"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SettingsIcon } from "@/components/SettingsIcon";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/places", label: "Places" },
  { href: "/search", label: "Find Shows" },
  { href: "/concerts/new", label: "Add Concert" },
  { href: "/concerts", label: "My Concerts" },
];

function isNavActive(pathname: string, href: string): boolean {
  return (
    pathname === href ||
    (href !== "/dashboard" &&
      href !== "/places" &&
      href !== "/search" &&
      pathname.startsWith(href))
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function closeSidebar() {
  const checkbox = document.getElementById(
    "app-sidebar"
  ) as HTMLInputElement | null;
  if (checkbox) checkbox.checked = false;
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="p-3 pt-4" aria-label="Main navigation">
      <ul className="menu menu-lg gap-1">
        {navItems.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={active ? "active font-medium" : ""}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <header className="bg-base-100 border-b border-base-300 shadow-sm shrink-0">
        <div className="px-4 py-4 lg:px-6 lg:py-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between max-w-[90rem] mx-auto w-full">
          <div className="flex items-start gap-3 min-w-0">
            <label
              htmlFor="app-sidebar"
              className="btn btn-square btn-ghost btn-sm lg:hidden shrink-0"
              aria-label="Open menu"
            >
              <MenuIcon />
            </label>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-tight">
                Concert Cost Tracker
              </h1>
              <p className="text-sm md:text-base opacity-70 mt-1 max-w-xl">
                Track what you spend, how long you stayed, and how much fun you had
                at every show.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end shrink-0 sm:pt-1">
            <p className="text-sm">
              Signed in as{" "}
              <span className="font-medium break-all">{userEmail}</span>
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href="/settings"
                className={`btn btn-circle btn-ghost btn-sm ${
                  pathname === "/settings" ? "btn-active" : ""
                }`}
                title="Settings"
                aria-label="Settings"
              >
                <SettingsIcon />
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-sm flex-1 sm:flex-none"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 w-full max-w-[90rem] mx-auto">
        <aside className="hidden lg:flex w-64 shrink-0 bg-base-100 border-r border-base-300 flex-col">
          <SidebarNav pathname={pathname} />
        </aside>

        <div className="drawer flex-1 min-h-0">
          <input id="app-sidebar" type="checkbox" className="drawer-toggle lg:hidden" />

          <div className="drawer-content flex flex-col min-h-0 w-full">
            <main className="flex-1 px-4 py-6 lg:px-6 max-w-6xl w-full">
              {children}
            </main>
          </div>

          <div className="drawer-side z-40 lg:hidden">
            <label
              htmlFor="app-sidebar"
              className="drawer-overlay"
              aria-label="Close menu"
            />
            <aside className="bg-base-100 border-r border-base-300 w-64 min-h-full flex flex-col">
              <SidebarNav pathname={pathname} onNavigate={closeSidebar} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
