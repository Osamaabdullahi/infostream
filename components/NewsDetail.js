"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";
import Sidenews from "./cards/Sidenews";

const NewsDetailComponent = ({ article, relatedNews }) => {
  const [SideData, setSideData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getSecond = async () => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&section=sport&show-fields=thumbnail`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setSideData(data.response.results);
    }
  };

  useEffect(() => {
    getSecond();
  }, []);

  if (!SideData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Article Section */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{article.webTitle}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{article.fields.byline}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{article.webPublicationDate}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>6 min read</span>
            </div>
          </div>
          <img
            src={article.fields.thumbnail}
            alt="thumbnail"
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <div className="prose max-w-none">
            <div
              className="prose prose-sm max-w-none text-gray-600 mt-4"
              dangerouslySetInnerHTML={{ __html: article.fields.body }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <ThumbsUp size={20} />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-800">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
            <div className="text-gray-600">543 views</div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-teal-700 mt-4">
            More News
          </h2>

          <div className="space-y-6 mt-4">
            {SideData.map((news, index) => (
              <Sidenews news={news} key={index} />
            ))}
          </div>
        </div>

        {/* Related News Section */}

        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Related News</h2>
          <div className="space-y-6">
            {relatedNews.map((news, index) => (
              <Link
                key={index}
                href={{
                  pathname: `/news/general/${news.webTitle}`,
                  query: {
                    id: news.id,
                  },
                }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={
                      news.fields.thumbnail ||
                      "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
                    }
                    alt={news.webTitle}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop if default image fails
                      e.target.src =
                        "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"; // Default image
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {news.webTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {news.trailText}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{news.webPublicationDate}</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NewsDetailPage({ sampleArticle }) {
  const [RelatedData, setRelatedData] = useState();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getRelatedNews = async () => {
    let url = `https://content.guardianapis.com/search?api-key=${apiKey}&section=technology&show-fields=thumbnail,trailText,body,byline&page-size=29`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setRelatedData(data.response.results);
    }
  };

  useEffect(() => {
    getRelatedNews();
  }, []);

  if (!RelatedData) {
    return <div>Loading.....</div>;
  }

  return (
    <NewsDetailComponent article={sampleArticle} relatedNews={RelatedData} />
  );
}
