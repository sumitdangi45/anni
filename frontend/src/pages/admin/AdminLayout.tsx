import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminFetch } from "@/lib/adminFetch";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Star,
  Mail,
  LogOut,
  Menu,
  X,
  Image,
  FileUp,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",   to: "/admin",              icon: LayoutDashboard, end: true },
  { label: "Blogs",       to: "/admin/blogs",         icon: FileText },
  { label: "Projects",    to: "/admin/projects",      icon: FolderKanban },
  { label: "Testimonials",to: "/admin/testimonials",  icon: Star },
  { label: "Contacts",    to: "/admin/contacts",      icon: Mail },
  { label: "Photos",      to: "/admin/photos",        icon: Image },
  { label: "Resume",      to: "/admin/resume",        icon: FileUp },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/contacts")
      .then((res) => res.json())
      .then((data: { read: boolean }[]) => {
        if (Array.isArray(data)) {
          setUnreadCount(data.filter((c) => c.read === false).length);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const sidebarNav = (
    <>
      <ul className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Contacts" && unreadCount > 0 && (
                <Badge className="ml-auto text-xs px-1.5 py-0.5 h-auto">
                  {unreadCount}
                </Badge>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="px-3 py-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r shrink-0">
        <div className="px-4 py-5 border-b">
          <span className="text-lg font-bold tracking-tight">Admin CMS</span>
        </div>
        <nav className="flex flex-col flex-1">{sidebarNav}</nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-white border-r flex flex-col transform transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold">Admin CMS</span>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col flex-1">{sidebarNav}</nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-auto">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="text-gray-600"
          >
            <Menu size={22} />
          </button>
          <span className="font-semibold">Admin CMS</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
