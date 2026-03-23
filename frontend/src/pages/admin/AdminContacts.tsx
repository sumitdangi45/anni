import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminFetch } from "@/lib/adminFetch";

interface Contact {
  _id: string;
  name: string;
  email: string;
  service?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

type FilterTab = "all" | "unread" | "read";

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<FilterTab>("all");

  const fetchContacts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await adminFetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/contacts/${id}/read`, {
        method: "PATCH",
      });
      if (!res.ok) return;
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, read: true } : c))
      );
    } catch {
      // silently ignore
    }
  };

  const filtered = contacts.filter((c) => {
    if (tab === "unread") return !c.read;
    if (tab === "read") return c.read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "read", label: "Read" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Submissions</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map(({ key, label }) => (
          <Button
            key={key}
            variant={tab === key ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(key)}
          >
            {label}
            {key === "unread" && unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs px-1.5 py-0">
                {unreadCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-16" />
            </Card>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-gray-500">Failed to load contacts.</p>
          <Button variant="outline" onClick={fetchContacts}>
            Retry
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-400 py-12 text-center">No contacts found.</p>
      )}

      {/* Table */}
      {!loading && !error && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((contact) => (
                <tr
                  key={contact._id}
                  onClick={() => !contact.read && markAsRead(contact._id)}
                  className={`transition-colors ${
                    contact.read
                      ? "bg-white text-gray-500 cursor-default"
                      : "bg-blue-50 font-semibold cursor-pointer hover:bg-blue-100"
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">{contact.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{contact.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {contact.service || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{contact.message}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {contact.read ? (
                      <Badge variant="secondary">Read</Badge>
                    ) : (
                      <Badge variant="destructive">Unread</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
