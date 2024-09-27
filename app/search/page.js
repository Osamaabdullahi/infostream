"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NewsCard from "@/components/cards/NewsCard";

const CategoryNewsPage = ({ category }) => {
  const query = useSearchParams().get("query");
  const [Allnews, setAllnews] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchNews = async (category = "") => {
    let url = `https://content.guardianapis.com/search?show-fields=body,byline,thumbnail&api-key=${apiKey}&page-size=51`;
    if (category) {
      url += `&q=${encodeURIComponent(category)}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setAllnews(data.response.results);
      } else {
        console.error("Error fetching news:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchNews(query);
  }, [query]);

  if (!Allnews) {
    return <div className="h-[100vh]">loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          <span className="text-blue-600">{query}</span> News
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
