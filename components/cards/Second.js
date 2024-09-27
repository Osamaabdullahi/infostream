import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
const Second = ({ item }) => (
  <Link
    href={{
      pathname: `/news/general/${item.webTitle}`,
      query: {
        id: item.id,
      },
    }}
  >
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={
          item.fields.thumbnail ||
          "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
        }
        alt="thumbnail image"
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if default image fails
          e.target.src =
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"; // Default image
        }}
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {item.webTitle}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {item.fields.trailText}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 ">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span className="line-clamp-1">{item.webPublicationDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span className="line-clamp-1">{item.fields.byline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>6</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Second;
