import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectionColor, formatDate } from "@/lib/sections";

function TopNews({ topNews }) {
  const lead = topNews[0];
  const color = sectionColor(lead.sectionName);

  return (
    <section className="bg-paper border-b border-rule">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          <div className="w-full md:w-1/2">
            <img
              src={
                lead.fields.thumbnail ||
                "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg"
              }
              alt={lead.webTitle}
              className="w-full h-64 md:h-[420px] object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://i.pinimg.com/564x/a0/ae/8d/a0ae8da0d3e41a59e2367fa5709294e8.jpg";
              }}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center border-l-0 md:border-l-2 md:pl-10" style={{ borderColor: color }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="section-dot" style={{ backgroundColor: color }} />
              <span className="eyebrow text-ink-soft">{lead.sectionName}</span>
            </div>

            <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.1] font-semibold text-ink mb-5">
              {lead.webTitle}
            </h2>

            <p className="font-serif italic text-lg text-ink-soft mb-6 leading-relaxed">
              {lead.fields.trailText}
            </p>

            <div className="font-mono text-xs uppercase tracking-widest2 text-ink-faint mb-8">
              <span>{lead.fields.byline}</span>
              <span className="mx-2">·</span>
              <span>{formatDate(lead.webPublicationDate)}</span>
            </div>

            <Link
              href={{
                pathname: `/news/general/${lead.webTitle}`,
                query: {
                  id: lead.id,
                  sectionName: lead.sectionName,
                },
              }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-ink pb-1 hover:gap-3 hover:text-signal hover:border-signal transition-all duration-200">
                Read the full story <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopNews;
