"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";
import Sidenews from "./cards/Sidenews";

const NewsDetailComponent = ({ article, relatedNews }) => {
  const [SideData, setSideData] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getSecond = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setSideData(data.articles);
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
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <div className="prose max-w-none">
            {/* {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))} */}
            <p className="mb-4">
              Despite its vast potential, AI poses numerous challenges and
              ethical concerns. One of the major issues is the potential
              displacement of jobs due to automation. While AI creates new job
              opportunities in emerging sectors, it also threatens jobs in
              industries such as manufacturing, transportation, and customer
              service. Bias in AI systems is another concern. Since AI models
              learn from data, they can inadvertently perpetuate biases present
              in the training data, leading to unfair outcomes, particularly in
              critical areas like hiring, lending, and law enforcement. Ensuring
              fairness, transparency, and accountability in AI systems is
              crucial to avoid reinforcing societal inequalities. AI also raises
              concerns about privacy and surveillance. The ability of AI systems
              to collect and analyze vast amounts of data has led to debates
              about how this data is used and the potential for surveillance.
              The ethical use of AI in law enforcement and national security
              remains a controversial issue. The development of AGI and ASI
              raises existential questions about the future of humanity. As AI
              systems become more intelligent, controlling their behavior and
              ensuring alignment with human values becomes a critical challenge.
              Thought leaders such as Elon Musk and Stephen Hawking have warned
              of the potential risks of creating superintelligent AI that could
              operate beyond human control. The Future of AI The future of AI
              holds both exciting possibilities and complex challenges. AI is
              expected to continue its rapid advancement, with innovations in
              quantum computing, neural networks, and natural language
              processing pushing the boundaries of what AI can achieve. As AI
              systems become more integrated into daily life, it will be
              essential to establish frameworks for their ethical development
              and regulation. Collaboration between governments, corporations,
              researchers, and society at large will be necessary to ensure that
              AI is used for the benefit of humanity while minimizing its risks.
              Policymakers will need to address issues such as job displacement,
              privacy, security, and bias, while promoting the use of AI in
              solving global challenges such as climate change, healthcare, and
              education. In conclusion, AI represents a powerful tool that has
              the potential to reshape the world in profound ways. While it
              presents challenges and ethical dilemmas, it also offers
              opportunities to improve human lives, drive innovation, and solve
              some of the most pressing problems facing society today. The key
              to realizing the benefits of AI lies in developing it responsibly
              and ensuring its alignment with human values.
            </p>
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
            <div className="text-gray-600">{article.views} views</div>
          </div>

          {/* {more news section} */}
          <div className="flex flex-col  lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            <section
              className="w-full lg:w-2/3"
              style={{ margin: "2em 0 0 0 " }}
            >
              <h2 className="text-2xl font-bold mb-6 text-teal-700 ">
                More News
              </h2>
              <div className="space-y-6 ">
                {SideData.map((news, index) => (
                  <Sidenews news={news} key={index} />
                ))}
              </div>
            </section>
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
                {" "}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={
                      news.urlToImage ||
                      "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
                    }
                    alt={news.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop if default image fails
                      e.target.src =
                        "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"; // Default image
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{news.summary}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{news.publishedAt}</span>
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
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setRelatedData(data.articles);
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
