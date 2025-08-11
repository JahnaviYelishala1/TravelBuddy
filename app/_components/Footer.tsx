"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold">
            🌍 Trip Planner
          </div>

          {/* Social Media */}
          <div className="flex gap-4 text-lg">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Trip Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
