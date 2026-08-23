"use client";

import React, { useState, useEffect } from "react";
import TopNews from "./cards/TopNews";
import NewsCard from "./cards/NewsCard";
import Sidenews from "./cards/Sidenews";
import Trending from "./cards/Trending";
import Second from "./cards/Second";

const SectionHeading = ({ children }) => (
  <div className="flex items-center gap-4 mb-8">
    <h2 className="font-serif text-2xl font-semibold text-ink whitespace-nowrap">
      {children}
    </h2>
    <span className="h-px bg-rule flex-1" />
  </div>
);

const NewsComponent = () => {
  const [Allnews, setAllnews] = useState(null);
  const [SecondData, setSecondData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);
  const [SideData, setSideData] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getNews = async () => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail,trailText,body,byline&page-size=12`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setAllnews(data.response.results);
    }
  };

  const getTrending = async () => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&section=technology&show-fields=thumbnail,trailText,body,byline&page-size=29`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setTrendingData(data.response.results);
    }
  };

  const getSide = async () => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&section=business&show-fields=thumbnail,trailText,body,byline&page-size=12`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setSideData(data.response.results);
    }
  };

  const getSecond = async () => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&section=sport&show-fields=thumbnail,trailText,body,byline&page-size=12`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setSecondData(data.response.results);
    }
  };

  useEffect(() => {
    getNews();
    getSide();
    getSecond();
    getTrending();
  }, []);

  if (!Allnews || !SideData || !SecondData || !TrendingData) {
    return (
      <div className="h-[100vh] flex items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-rule border-t-ink rounded-full animate-spin" />
          <span className="eyebrow text-ink-faint">Loading today&apos;s edition</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <TopNews topNews={Allnews} />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <SectionHeading>Breaking Stories</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Allnews.map((news, index) => (
            <NewsCard news={news} key={index} />
          ))}
        </div>
      </section>

      <section className="bg-paper-dim py-14 border-y border-rule">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading>From Business</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SideData.map((item, index) => (
              <Second key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 flex flex-col lg:flex-row gap-14">
        <section className="w-full lg:w-2/3">
          <SectionHeading>Latest Updates</SectionHeading>
          <div>
            {SecondData.map((news, index) => (
              <Sidenews news={news} key={index} />
            ))}
          </div>
        </section>

        <aside className="w-full lg:w-1/3">
          <SectionHeading>Trending Now</SectionHeading>
          <div className="bg-paper-dim/60 border border-rule p-6">
            {TrendingData.slice(0, 8).map((news, index) => (
              <Trending news={news} key={index} index={index} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsComponent;
