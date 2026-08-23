"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NewsDetailPage from "@/components/NewsDetail";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const sectionName = searchParams.get("sectionName");
  const [sampleArticle, setsampleArticle] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchNews = async () => {
    let url = `https://content.guardianapis.com/${id}?api-key=${apiKey}&show-fields=thumbnail,trailText,body,byline`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setsampleArticle(data.response.content);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  console.log(sampleArticle);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NewsDetailPage sampleArticle={sampleArticle} />
    </div>
  );
}

export default Page;
