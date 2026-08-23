"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NewsCard from "@/components/cards/NewsCard";
import { sectionColor } from "@/lib/sections";

const CategoryNewsPage = () => {
  const currentPath = usePathname().split("/").pop();
  const [Allnews, setAllnews] = useState(null);
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

  const color = sectionColor(currentPath);

  if (!Allnews) {
    return (
      <div className="h-[100vh] flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border-2 border-rule border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="section-dot" style={{ backgroundColor: color }} />
          <span className="eyebrow text-ink-soft">Section</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-10 capitalize">
          {currentPath}
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
