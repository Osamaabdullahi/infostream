"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";
import Sidenews from "./cards/Sidenews";
import { sectionColor, formatDate } from "@/lib/sections";

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
      <div className="flex items-center justify-center h-screen bg-paper">
        <div className="w-8 h-8 border-2 border-rule border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  const color = sectionColor(article.sectionName);

  return (
    <div className="bg-paper">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-14">
          {/* Main Article Section */}
          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 mb-4">
              <span className="section-dot" style={{ backgroundColor: color }} />
              <span className="eyebrow text-ink-soft">
                {article.sectionName}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-ink mb-6">
              {article.webTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest2 text-ink-faint mb-8 pb-8 border-b border-rule">
              <div className="flex items-center gap-2">
                <User size={14} />
                <span>{article.fields.byline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{formatDate(article.webPublicationDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>6 min read</span>
              </div>
            </div>

            <img
              src={article.fields.thumbnail}
              alt="thumbnail"
              className="w-full h-64 md:h-96 object-cover mb-10"
            />

            <div className="article-body max-w-none text-ink-soft text-[1.05rem]">
              <div
                dangerouslySetInnerHTML={{ __html: article.fields.body }}
              ></div>
            </div>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-rule">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors">
                  <ThumbsUp size={18} />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest2 text-ink-faint">
                543 views
              </div>
            </div>

            <div className="mt-16">
              <h2 className="font-serif text-2xl font-semibold text-ink mb-2">
                More News
              </h2>
              <div>
                {SideData.map((news, index) => (
                  <Sidenews news={news} key={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Related News Section */}
          <div className="lg:w-1/3">
            <h2 className="font-serif text-2xl font-semibold text-ink mb-6">
              Related News
            </h2>
            <div className="space-y-8">
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
                  <div className="group border-t border-rule pt-4">
                    <img
                      src={
                        news.fields.thumbnail ||
                        "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
                      }
                      alt={news.webTitle}
                      className="w-full h-44 object-cover mb-3"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg";
                      }}
                    />
                    <h3 className="font-serif font-semibold text-lg text-ink mb-2 leading-snug group-hover:text-signal transition-colors">
                      {news.webTitle}
                    </h3>
                    <p className="text-ink-soft text-sm mb-2 line-clamp-2">
                      {news.trailText}
                    </p>
                    <div className="flex justify-between items-center font-mono text-[0.65rem] uppercase tracking-wide text-ink-faint">
                      <span>{formatDate(news.webPublicationDate)}</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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

  if (!RelatedData || !sampleArticle) {
    return (
      <div className="flex items-center justify-center h-screen bg-paper">
        <div className="w-8 h-8 border-2 border-rule border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <NewsDetailComponent article={sampleArticle} relatedNews={RelatedData} />
  );
}
