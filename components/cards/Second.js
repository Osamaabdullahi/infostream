import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { sectionColor, formatDate } from "@/lib/sections";

const Second = ({ item }) => {
  const color = sectionColor(item.sectionName);

  return (
    <Link
      href={{
        pathname: `/news/general/${item.webTitle}`,
        query: {
          id: item.id,
        },
      }}
    >
      <div className="group bg-paper border border-rule hover:border-ink transition-colors duration-200">
        <img
          src={
            item.fields.thumbnail ||
            "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
          }
          alt="thumbnail image"
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg";
          }}
        />

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="section-dot" style={{ backgroundColor: color }} />
            <span className="eyebrow text-ink-soft">{item.sectionName}</span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2 line-clamp-2 group-hover:text-signal transition-colors">
            {item.webTitle}
          </h3>
          <p className="text-ink-soft text-sm mb-5 line-clamp-3 leading-relaxed">
            {item.fields.trailText}
          </p>
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wide text-ink-faint border-t border-rule pt-3">
            <div className="flex items-center gap-2">
              <User size={13} />
              <span className="line-clamp-1">{item.fields.byline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={13} />
              <span>{formatDate(item.webPublicationDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Second;
