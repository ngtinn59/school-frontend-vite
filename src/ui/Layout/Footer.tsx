import React, { memo } from "react";

type Props = {
  className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={`bg-gray-800 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h2 className="text-xl font-semibold text-white mb-4">
              Generate CV for Free
            </h2>
            <p className="text-gray-400">
              Create your professional CV with ease.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-400 hover:text-white">
                  User Profile
                </a>
              </li>
              <li>
                <a href="/create-cv" className="text-gray-400 hover:text-white">
                  Create CV
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-gray-400">
              Email: thanhb2004808@student.ctu.edu.vn
            </p>
            <p className="text-gray-400">Phone: +84 79 544 2122</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
