"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NewsCard from "@/components/cards/NewsCard";

const SearchNewsPage = () => {
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
    return (
      <div className="h-[100vh] flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border-2 border-rule border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <span className="eyebrow text-ink-soft block mb-2">Search results</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-10">
          &ldquo;{query}&rdquo;
        </h1>
        {Allnews.length === 0 ? (
          <p className="text-ink-soft">No stories matched your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Allnews.map((item, index) => (
              <NewsCard key={index} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchNewsPage;
