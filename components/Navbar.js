"use client";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

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

  return (
    // <div className=" bg-gray-900 text-gray-100">
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 ">
      <header className="bg-treal-600 shadow-lg">
        <div className=" container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-white cursor-pointer">
              Info|Stream
            </h1>
          </Link>
          <nav className="mobile">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="/"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/news/world"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  World
                </a>
              </li>
              <li>
                <a
                  href="/news/technology"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Tech
                </a>
              </li>
              <li>
                <a
                  href="/news/culture"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Culture
                </a>
              </li>
              <li>
                <a
                  href="/news/business"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  business
                </a>
              </li>
              <li>
                <a
                  href="/news/travel"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Travel
                </a>
              </li>
              <li>
                <a
                  href="/news/science"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Science
                </a>
              </li>
              <li>
                <a
                  href="/news/environment"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Environment
                </a>
              </li>
            </ul>
          </nav>
          <div className="">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* <FaSearch className="text-white hover:text-yellow-300 cursor-pointer" />
                  <FaBell className="text-white hover:text-yellow-300 cursor-pointer" /> */}
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-32 md:w-48 lg:w-64 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </form>
                  <Link href="/profile">
                    <FaUser className="text-white hover:text-yellow-300 cursor-pointer" />
                  </Link>
                </>
              ) : (
                <Link href="/sighup">
                  <button className="w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300">
                    Subscribe
                  </button>
                </Link>
              )}
            </div>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="bar">
            <FaBars size={30} />
          </button>
        </div>
      </header>
      {isOpen ? <MobileView /> : null}
    </div>
  );
};

export default Navbar;

const MobileView = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="mt-4 md:hidden">
      <nav>
        <ul className="flex flex-col space-y-2">
          {/* {["/","general", "technology", "entertainment", "business"].map((item) => (
            <li key={item}>
              <a
                href="/news"
                className="block text-white hover:text-yellow-300 transition duration-300"
              >
                {item}
              </a>
            </li>
          ))} */}
          <li>
            <a
              href="/"
              className="block text-white hover:text-yellow-300 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/news/general"
              className="block text-white hover:text-yellow-300 transition duration-300"
            >
              world
            </a>
          </li>
          <li>
            <a
              href="/news/technology"
              className="block text-white hover:text-yellow-300 transition duration-300"
            >
              tech
            </a>
          </li>
          <li>
            <a
              href="/news/entertainment"
              className="block text-white hover:text-yellow-300 transition duration-300"
            >
              Culture
            </a>
          </li>
          <li>
            <a
              href="/news/business"
              className="block text-white hover:text-yellow-300 transition duration-300"
            >
              business
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <FaSearch className="text-white hover:text-yellow-300 cursor-pointer" />
            <FaBell className="text-white hover:text-yellow-300 cursor-pointer" />
            <FaUser className="text-white hover:text-yellow-300 cursor-pointer" />
          </div>
        ) : (
          <Link href="/sighup">
            <button className="w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300">
              Subscribe
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
