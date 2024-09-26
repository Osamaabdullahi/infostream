"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NewsDetailPage from "@/components/NewsDetail";

function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const image = searchParams.get("image");
  const content = searchParams.get("content");
  const author = searchParams.get("author");

  const sampleArticle = {
    title,
    author,
    date,
    readTime: 8,
    image,
    content,
    views: 1234,
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NewsDetailPage sampleArticle={sampleArticle} />
    </div>
  );
}

export default Page;
