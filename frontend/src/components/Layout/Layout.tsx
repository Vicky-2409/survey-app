import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-grow w-full">{children}</main>

      <footer className="w-full py-4 bg-white border-t border-gray-200">
        <div className="px-4 mx-auto w-full flex justify-center md:justify-between items-center flex-wrap">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Survey App. All rights reserved.
          </p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
