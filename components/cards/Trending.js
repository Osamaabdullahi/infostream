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
      <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
        <span className="text-2xl font-bold text-teal-600 mr-4">
          {index + 1}
        </span>
        <span className="text-lg font-semibold">{news.webTitle}</span>
      </div>
    </Link>
  );
}

export default Trending;
