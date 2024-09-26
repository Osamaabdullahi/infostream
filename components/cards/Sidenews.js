import React from "react";
import Link from "next/link";

function Sidenews({ news }) {
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
      <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 transition duration-300 hover:shadow-lg hover:shadow-teal-500/50">
        <img
          src={
            news.urlToImage ||
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
          }
          alt="News thumbnail"
          className="w-full md:w-48 h-32 object-cover rounded"
        />
        <div>
          <span className="text-sm text-teal-600 font-semibold">
            world news
          </span>
          <h3 className="text-xl font-bold mt-2 mb-2">{news.title}</h3>
          <p className="text-gray-600 text-sm">
            By {news.author} | {news.publishedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Sidenews;
