import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">

        <nav>
          <div className="flex flex-col items-center gap-4 rounded-xl mx-auto">
            <h2 className="text-xl font-bold mb-2 text-gray-700">Services</h2>
            <a
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
               Branding
            </a>
            <a
              className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition"
            >
               Design
            </a>
            <a
              className="flex items-center gap-2 text-pink-500 hover:text-pink-700 transition"
            >
               Marketing
            </a>
            <a

              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
            >
              Advertisement
            </a>
          </div>
        </nav>
        <nav>
          <div className="flex flex-col items-center gap-4 rounded-xl mx-auto">
            <h2 className="text-xl font-bold mb-2 text-gray-700">Company</h2>
            <a
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
               About us
            </a>
            <a
              className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition"
            >
               Contact
            </a>
            <a
              className="flex items-center gap-2 text-pink-500 hover:text-pink-700 transition"
            >
               Jobs
            </a>
            <a

              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
            >
              Press kit
            </a>
          </div>
        </nav>
        <nav>
          <div className="flex flex-col items-center gap-4 rounded-xl mx-auto">
            <h2 className="text-xl font-bold mb-2 text-gray-700">Legal</h2>
            <a
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
               Terms of use
            </a>
            <a
              className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition"
            >
               Privacy policy
            </a>
            <a
              className="flex items-center gap-2 text-pink-500 hover:text-pink-700 transition"
            >
               Cookie policy
            </a>
            {/* <a

              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
            >
              LinkedIn
            </a> */}
          </div>
        </nav>
        <nav>
          <div className="flex flex-col items-center gap-4 rounded-xl mx-auto">
            <h2 className="text-xl font-bold mb-2 text-gray-700">Follow Us</h2>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
              <FaFacebookF /> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition"
            >
              <FaTwitter /> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-500 hover:text-pink-700 transition"
            >
              <FaInstagram /> Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
            >
              <FaLinkedinIn /> LinkedIn
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Shafayat
          </p>
        </aside>
      </footer>
    </div>
  );
}
