import React from "react";
import Link from "next/link";

function Trending({ news, index }) {
  return (
    <Link
      href={{
        pathname: `/news/general/${news.webTitle}`,
        query: {
          id: news.id,
        },
      }}
    >
      <div className="group flex items-baseline gap-4 py-4 border-b border-rule last:border-b-0">
        <span className="font-serif text-2xl text-ink-faint group-hover:text-signal transition-colors leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-serif text-base font-medium text-ink leading-snug group-hover:text-signal transition-colors">
          {news.webTitle}
        </span>
      </div>
    </Link>
  );
}

export default Trending;
