import React from "react";
import Link from "next/link";
import { sectionColor, formatDate } from "@/lib/sections";

function Sidenews({ news }) {
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
      <div className="group flex flex-col md:flex-row gap-5 py-5 border-b border-rule hover:bg-paper-dim/50 transition-colors duration-200 -mx-2 px-2">
        <img
          src={
            news.fields.thumbnail ||
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
          }
          alt="News thumbnail"
          className="w-full md:w-44 h-32 object-cover flex-shrink-0"
        />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="section-dot" style={{ backgroundColor: color }} />
            <span className="eyebrow text-ink-soft">{news.sectionName}</span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2 leading-snug group-hover:text-signal transition-colors">
            {news.webTitle}
          </h3>
          <p className="font-mono text-[0.7rem] uppercase tracking-wide text-ink-faint">
            {news.fields.byline} · {formatDate(news.webPublicationDate)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Sidenews;
