import React from "react";
import Link from "next/link";

function Trending({ news, index }) {
  return (
    <Link
      href={{
        pathname: `/news/general/${news.id}`,
        query: {
          title: news.title,
          date: news.publishedAt,
          image:
            news.urlToImage ||
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg",
          content: news.description,
          author: news.author,
        },
      }}
    >
      <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
        <span className="text-2xl font-bold text-teal-600 mr-4">
          {index + 1}
        </span>
        <span className="text-lg font-semibold">{news.title}</span>
      </div>
    </Link>
  );
}

export default Trending;
