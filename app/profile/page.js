"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Globe,
  Bookmark,
  Clock,
  Edit2,
  Camera,
} from "lucide-react";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isAuth) {
      router.push("/sighin");
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border-2 border-rule border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-paper min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-paper border border-rule">
          {/* Profile Header */}
          <div className="relative h-40 bg-masthead">
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6 flex items-end">
              <div className="relative">
                <img
                  src="https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-paper"
                />
                <button className="absolute bottom-0 right-0 bg-paper border border-rule rounded-full p-1.5">
                  <Camera size={14} className="text-ink-soft" />
                </button>
              </div>
              <div className="ml-4 text-paper pb-1">
                <h1 className="font-serif text-2xl font-semibold">{user.name}</h1>
                <p className="text-sm text-paper/70 font-mono">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-xl font-semibold text-ink">
                Profile information
              </h2>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-ink text-paper px-4 py-2 text-xs font-mono uppercase tracking-widest2 hover:bg-masthead transition-colors"
                >
                  Save changes
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  <Edit2 size={16} /> Edit profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-rule pb-3">
                  <User size={18} className="text-ink-faint" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ""}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  ) : (
                    <span className="text-sm text-ink">{user.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 border-b border-rule pb-3">
                  <Mail size={18} className="text-ink-faint" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ""}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  ) : (
                    <span className="text-sm text-ink">{user.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 border-b border-rule pb-3">
                  <Globe size={18} className="text-ink-faint" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editedUser.location || ""}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  ) : (
                    <span className="text-sm text-ink">{user.location}</span>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="eyebrow text-ink-soft">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border border-rule text-ink-soft text-xs font-mono uppercase tracking-wide"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-2 border border-signal text-signal px-4 py-2 text-xs font-mono uppercase tracking-widest2 hover:bg-signal hover:text-paper transition-colors"
                >
                  Log out
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-12">
              <h3 className="font-serif text-xl font-semibold text-ink mb-5">
                Recent activity
              </h3>
              <div>
                {user.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-4 border-b border-rule last:border-b-0"
                  >
                    {activity.type === "bookmark" ? (
                      <Bookmark size={18} className="text-ink-soft mt-0.5 flex-shrink-0" />
                    ) : (
                      <Clock size={18} className="text-ink-soft mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-ink">{activity.title}</p>
                      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-ink-faint mt-0.5">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isLoggedIn);

  const sampleUser = {
    name: user?.first_name,
    username: user?.last_name,
    email: user?.email,
    location: "New York, USA",
    avatar: "/api/placeholder/150/150",
    interests: ["Technology", "Politics", "Environment", "Sports"],
    recentActivity: [
      {
        type: "bookmark",
        title: "The Future of AI in Journalism",
        timestamp: "2 hours ago",
      },
      {
        type: "read",
        title: "Global Climate Summit: Key Takeaways",
        timestamp: "1 day ago",
      },
      {
        type: "bookmark",
        title: "Space Tourism: A New Frontier",
        timestamp: "3 days ago",
      },
      {
        type: "read",
        title: "The Impact of Social Media on Mental Health",
        timestamp: "1 week ago",
      },
    ],
  };

  useEffect(() => {
    if (!isAuth) {
      router.push("/sighin");
    }
  }, [isAuth, router]);

  return <UserProfile user={sampleUser} />;
}
