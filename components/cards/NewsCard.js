import React from "react";
import Link from "next/link";

function NewsCard({ news }) {
  return (
    <Link
      href={{
        pathname: `/news/general/${news.webTitle}`,
        query: {
          id: news.id,
        },
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden transition duration-300 hover:shadow-lg hover:shadow-teal-500/50">
        <img
          src={
            news.fields.thumbnail ||
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
          }
          alt="News thumbnail"
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if default image fails
            e.target.src =
              "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"; // Path to your default image
          }}
        />
        <div className="p-4">
          <span className="text-sm text-teal-600 font-semibold">
            {news.sectionName}
          </span>
          <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2">
            {news.webTitle}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1">
            By {news.fields.byline} | {news.webPublicationDate}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
