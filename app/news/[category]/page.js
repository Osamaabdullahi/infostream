"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const NewsCard = ({ item }) => (
  <Link
    href={{
      pathname: `/news/general/${item.id}`,
      query: {
        title: item.title,
        date: item.publishedAt,
        image:
          item.urlToImage ||
          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg",
        content: item.description,
        author: item.author,
      },
    }}
  >
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={
          item.urlToImage ||
          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
        }
        alt="News thumbnail"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{item.publishedAt}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const CategoryNewsPage = ({ category }) => {
  const currentPath = usePathname().split("/").pop();
  const [Allnews, setAllnews] = useState(null);
  const [Category, setCategory] = useState("");
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchNews = async (category = "") => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setAllnews(data.articles);
    }
  };

  useEffect(() => {
    fetchNews(currentPath);
  }, [Category]);

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
            <NewsCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNewsPage;
