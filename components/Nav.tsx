import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="grid w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-blue-400 mt-5 place-content-end">
      <div className="w-full flex justify-between mt-0 px-6 py-2">
        <nav>
          <ul className="flex justify-end text-base text-blue-600 pt-4 md:pt-0">
            <li className="ml-auto mr-4">
              <Link
                className="inline-block no-underline hover:underline font-medium text-lg py-2 px-4"
                href="/explore"
              >
                Explore country values
              </Link>
            </li>
            <li className="ml-auto mr-4">
              <Link
                className="inline-block no-underline hover:underline font-medium text-lg py-2 px-4"
                href="/compare"
              >
                Compare countries
              </Link>
            </li>
            <li className="ml-auto mr-4">
              <Link
                className="inline-block no-underline hover:underline font-medium text-lg py-2 px-4"
                href="/survey#"
              >
                Find a country that matches your values
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Nav;

