import React from "react";
import Link from "next/link";
import { sectionColor, formatDate } from "@/lib/sections";

function NewsCard({ news }) {
  const color = sectionColor(news.sectionName);

  return (
    <Link
      href={{
        pathname: `/news/general/${news.webTitle}`,
        query: {
          id: news.id,
        },
      }}
    >
      <div className="group h-full flex flex-col bg-paper border-t-2 hover:-translate-y-0.5 transition-transform duration-200" style={{ borderColor: color }}>
        <img
          src={
            news.fields.thumbnail ||
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
          }
          alt="News thumbnail"
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg";
          }}
        />
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="section-dot" style={{ backgroundColor: color }} />
            <span className="eyebrow text-ink-soft">{news.sectionName}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-signal transition-colors">
            {news.webTitle}
          </h3>
          <p className="mt-auto font-mono text-[0.7rem] uppercase tracking-wide text-ink-faint line-clamp-1">
            {news.fields.byline} · {formatDate(news.webPublicationDate)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
