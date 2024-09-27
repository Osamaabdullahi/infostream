import React from "react";
import Link from "next/link";

function TopNews({ topNews }) {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-blue-500 pb-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center min-h-[70vh]">
          <div className="w-full md:w-3/5 mb-8 md:mb-0 md:pr-8 flex flex-col justify-center items-start h-full">
            <span className="text-yellow-300 font-semibold text-lg">
              {topNews[0].sectionName}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-white">
              {topNews[0].webTitle}
            </h2>
            <p className="text-lg text-gray-100 mb-6">
              {topNews[0].fields.trailText}
            </p>

            <div className="flex items-center text-gray-200">
              <span>By {topNews[0].fields.byline}</span>
              <span className="mx-2">|</span>
              <span>{topNews[0].webPublicationDate}</span>
            </div>
            <Link
              href={{
                pathname: `/news/general/${topNews[0].webTitle}`,
                query: {
                  id: topNews[0].id,
                  sectionName: topNews[0].sectionName,
                },
              }}
            >
              <button className="mt-6 bg-yellow-400 text-teal-800 px-6 py-3 rounded-md hover:bg-yellow-300 transition duration-300 font-semibold">
                Read Full Story
              </button>
            </Link>
          </div>
          <div className="w-full md:w-2/5">
            <img
              src={
                topNews[0].fields.thumbnail ||
                "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
              }
              alt="Top news"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop if default image fails
                e.target.src =
                  "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"; // Fallback to the default image
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopNews;
