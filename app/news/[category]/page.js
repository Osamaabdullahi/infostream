"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import NewsCard from "@/components/cards/NewsCard";

const CategoryNewsPage = ({ category }) => {
  const currentPath = usePathname().split("/").pop();
  const [Allnews, setAllnews] = useState(null);
  const [Category, setCategory] = useState("");
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchNews = async (category = "") => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail,trailText,body,byline&page-size=51`;
    if (category) {
      url += `&section=${currentPath}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setAllnews(data.response.results);
    }
  };

  useEffect(() => {
    fetchNews(currentPath);
  }, [currentPath]);

  if (!Allnews) {
    return <div className="h-[100vh]">loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          {currentPath} <span className="text-blue-600">{category}</span> News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Allnews.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNewsPage;
