"use client";

import React, { useState, useEffect } from "react";
import TopNews from "./cards/TopNews";
import NewsCard from "./cards/NewsCard";
import Sidenews from "./cards/Sidenews";
import Trending from "./cards/Trending";
import Second from "./cards/Second";

const NewsComponent = () => {
  const [Allnews, setAllnews] = useState(null);
  const [SecondData, setSecondData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);
  const [SideData, setSideData] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setAllnews(data.articles);
    }
  };

  const getTrending = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setTrendingData(data.articles);
    }
  };

  const getSide = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setSideData(data.articles);
    }
  };

  const getSecond = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setSecondData(data.articles);
    }
  };

  useEffect(() => {
    getNews();
    getTrending();
    getSide();
    getSecond();
  }, []);

  if (!Allnews || !TrendingData || !SideData || !SecondData) {
    return <div className="h-[100vh]">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen ">
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 ">
        <TopNews topNews={Allnews} />
      </section>
      <section className="mb-12   p-4">
        <h2 className="text-2xl font-bold mb-6 text-teal-700">
          Breaking Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Allnews.map((news, index) => {
            return <NewsCard news={news} key={index} />;
          })}
        </div>
      </section>

      <div
        style={{ margin: "1em 0 2em 0" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4"
      >
        {SideData.map((item, index) => (
          <Second key={index} item={item} />
        ))}
      </div>

      <div
        style={{ margin: "1em 0 2em 0" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4"
      >
        {Allnews.slice(10, 14).map((news, index) => (
          <NewsCard news={news} key={index} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-4">
        <section className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-teal-700">
            Latest Updates
          </h2>
          <div className="space-y-6">
            {SecondData.slice(10, 19).map((news, index) => (
              <Sidenews news={news} key={index} />
            ))}
          </div>
        </section>

        <aside className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-6 text-teal-700">
            Trending Now
          </h2>
          <div className="bg-white rounded-lg p-6">
            {TrendingData.map((news, index) => (
              <Trending news={news} key={index} index={index} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsComponent;
