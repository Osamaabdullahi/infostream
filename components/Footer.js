import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-masthead text-paper/85 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="font-serif text-2xl text-paper mb-3">
              Info<span className="text-signal">|</span>Stream
            </h2>
            <p className="text-sm text-paper/60 leading-relaxed">
              Independent daily coverage of world affairs, business, technology
              and culture — reported and curated for readers who want the
              full story, not just the headline.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-paper/50 mb-4">Sections</h3>
            <ul className="space-y-2 text-sm">
              {["World", "Technology", "Business", "Culture", "Science"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/news/${item.toLowerCase()}`}
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-paper/50 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-paper/50 mb-4">The Daily Brief</h3>
            <p className="text-sm text-paper/60 mb-4">
              One email, every morning, with the stories that matter.
            </p>
            <form className="flex border-b border-paper/30 focus-within:border-paper transition-colors">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent flex-1 py-2 text-sm placeholder:text-paper/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-paper/70 hover:text-white transition-colors px-2"
              >
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-paper/50 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-paper/50 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-paper/50 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-paper/50 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest2 text-paper/40">
          <span>&copy; {new Date().getFullYear()} Info|Stream. All rights reserved.</span>
          <span>Reporting powered by The Guardian Open Platform</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
