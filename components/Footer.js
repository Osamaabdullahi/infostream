import React from "react";
import {
  FaSearch,
  FaBell,
  FaUser,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className=" bg-gray-900 text-gray-100">
        <footer className="bg-teal-700 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  About Us
                </h3>
                <p className="text-gray-300">
                  OceanView News delivers round-the-clock coverage of global
                  events, ensuring you're always in the know.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-yellow-300 transition duration-300"
                  >
                    <FaFacebookF size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-yellow-300 transition duration-300"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-yellow-300 transition duration-300"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-yellow-300 transition duration-300"
                  >
                    <FaLinkedinIn size={24} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Stay Updated
                </h3>
                <p className="text-gray-300 mb-4">
                  Get the latest news delivered to your inbox.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-teal-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full"
                  />
                  <button className="bg-yellow-400 text-teal-800 px-4 py-2 rounded-r-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                    <FaArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-teal-600 text-center text-gray-300">
              <p>&copy; 2024 OceanView News. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
