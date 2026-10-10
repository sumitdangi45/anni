import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminFetch } from "@/lib/adminFetch";
import { FileText, FolderKanban, Star, Mail } from "lucide-react";

interface Stats {
  blogs: number;
  projects: number;
  testimonials: number;
  contacts: number;
  unread: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    projects: 0,
    testimonials: 0,
    contacts: 0,
    unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [blogsRes, projectsRes, testimonialsRes, contactsRes] =
          await Promise.all([
            adminFetch("/api/admin/blogs"),
            adminFetch("/api/admin/projects"),
            adminFetch("/api/admin/testimonials"),
            adminFetch("/api/admin/contacts"),
          ]);

        const [blogs, projects, testimonials, contacts] = await Promise.all([
          blogsRes.json(),
          projectsRes.json(),
          testimonialsRes.json(),
          contactsRes.json(),
        ]);

        setStats({
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          unread: Array.isArray(contacts)
            ? contacts.filter((c: { read: boolean }) => c.read === false).length
            : 0 });
      } catch {
        // silently fail — stats stay at 0
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const statCards = [
    {
      label: "Blogs",
      value: stats.blogs,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50" },
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-purple-600",
      bg: "bg-purple-50" },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50" },
    {
      label: "Contacts",
      value: stats.contacts,
      icon: Mail,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: stats.unread > 0 ? `${stats.unread} unread` : undefined },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-24" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg, sub }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {label}
                </CardTitle>
                <div className={`p-2 rounded-md ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
                {sub && (
                  <p className="text-xs text-orange-500 mt-1">{sub}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
