import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
const Second = ({ item }) => (
  <Link
    href={{
      pathname: `/news/general/${item.id}`,
      query: {
        title: item.title,
        date: item.publishedAt,
        image:
          item.urlToImage ||
          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg",
        content: item.description,
        author: item.author,
      },
    }}
  >
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* <img
      src={item.urlToImage}
      alt={item.title}
      className="w-full h-48 object-cover"
    /> */}
      <img
        src={
          item.urlToImage ||
          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
        }
        alt={item.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if default image fails
          e.target.src =
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"; // Default image
        }}
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{item.publishedAt}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>6 min read</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Second;
