"use client";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { label: "World", href: "/news/world" },
  { label: "Technology", href: "/news/technology" },
  { label: "Business", href: "/news/business" },
  { label: "Culture", href: "/news/culture" },
  { label: "Travel", href: "/news/travel" },
  { label: "Science", href: "/news/science" },
  { label: "Environment", href: "/news/environment" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-paper border-b border-rule sticky top-0 z-40">
      {/* Utility bar */}
      <div className="hidden md:block bg-masthead text-paper/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-8 text-[0.7rem] font-mono uppercase tracking-widest2">
          <span>{today}</span>
          <div className="flex items-center gap-6">
            <span className="text-paper/50">Nairobi Edition</span>
            {!isAuthenticated && (
              <Link href="/sighin" className="hover:text-white transition-colors">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-ink"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className="mx-auto md:mx-0">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-ink text-center">
            Info<span className="text-signal">|</span>Stream
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-b border-ink-faint focus-within:border-ink transition-colors"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories…"
              className="w-40 lg:w-56 bg-transparent py-1 text-sm placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-ink-soft hover:text-ink transition-colors pl-2"
            >
              <Search size={16} />
            </button>
          </form>

          {isAuthenticated ? (
            <Link
              href="/profile"
              className="text-ink-soft hover:text-ink transition-colors"
              aria-label="Profile"
            >
              <User size={20} />
            </Link>
          ) : (
            <Link href="/sighup">
              <button className="border border-ink text-ink px-5 py-2 text-xs font-mono uppercase tracking-widest2 hover:bg-ink hover:text-paper transition-colors duration-200">
                Subscribe
              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden w-6" />
      </div>

      {/* Section nav */}
      <nav className="hidden md:block border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ul className="flex items-center gap-8 h-11 overflow-x-auto">
            <li>
              <Link
                href="/"
                className="text-xs font-mono uppercase tracking-widest2 text-ink hover:text-signal transition-colors whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-xs font-mono uppercase tracking-widest2 text-ink-soft hover:text-signal transition-colors whitespace-nowrap"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isOpen && (
        <MobileView
          isAuthenticated={isAuthenticated}
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />
      )}
    </header>
  );
};

export default Navbar;

const MobileView = ({ isAuthenticated, query, setQuery, handleSubmit }) => {
  return (
    <div className="md:hidden border-t border-rule bg-paper">
      <form onSubmit={handleSubmit} className="flex items-center border-b border-rule px-4 py-3">
        <Search size={16} className="text-ink-soft mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories…"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </form>
      <nav className="px-4 py-3">
        <ul className="flex flex-col divide-y divide-rule">
          <li className="py-3">
            <Link href="/" className="text-sm font-mono uppercase tracking-widest2 text-ink">
              Home
            </Link>
          </li>
          {SECTIONS.map((s) => (
            <li key={s.href} className="py-3">
              <Link
                href={s.href}
                className="text-sm font-mono uppercase tracking-widest2 text-ink-soft"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 pb-4">
        {isAuthenticated ? (
          <Link href="/profile">
            <button className="w-full border border-ink text-ink px-4 py-2 text-xs font-mono uppercase tracking-widest2">
              My Profile
            </button>
          </Link>
        ) : (
          <Link href="/sighup">
            <button className="w-full bg-ink text-paper px-4 py-2 text-xs font-mono uppercase tracking-widest2">
              Subscribe
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
