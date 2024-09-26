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
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saving user data:", editedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-indigo-600">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 flex items-end">
              <div className="relative">
                <img
                  src={
                    "https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
                  }
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg">
                  <Camera size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-sm opacity-90">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  <Edit2 size={18} className="mr-1" /> Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User size={20} className="text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  ) : (
                    <span>{user.name}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Mail size={20} className="text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Globe size={20} className="text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editedUser.location}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  ) : (
                    <span>{user.location}</span>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {user.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    {activity.type === "bookmark" ? (
                      <Bookmark
                        size={20}
                        className="text-indigo-500 mr-2 flex-shrink-0"
                      />
                    ) : (
                      <Clock
                        size={20}
                        className="text-green-500 mr-2 flex-shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">
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
