import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
<div className="grid grid-cols-3 gap-8 py-10 bg-slate-100 text-black px-20">

  <div className="flex justify-center">
    <ul>
    <p className="text-lg font-semibold">Website created by Adrian Puscuta</p>
    <li>
    <Link
      className="mt-2 block link-secondary link-opacity-75 hover:link-opacity-100 underline"
      href="mailto:adrian.puscu@gmail.com"
    >
      Send me an E-mail
    </Link>
    </li>
    </ul>
  </div>

  <div className="flex justify-center">
    
    <ul className="list-disc list-inside no-underline">
    <h4 className="text-lg font-semibold mb-4">Technologies used:</h4>
      <li>
        <Link
          className="link-secondary link-opacity-75 hover:link-opacity-100"
          href="https://flask.palletsprojects.com/en/2.3.x/"
        >
          Flask
        </Link>
      </li>
      <li>
        <Link
          className="link-secondary link-opacity-75 hover:link-opacity-100"
          href="https://pandas.pydata.org/"
        >
          Pandas
        </Link>
      </li>
      <li>
        <Link
          className="link-secondary link-opacity-75 hover:link-opacity-100"
          href="https://nextjs.org"
        >
          Next JS v13
        </Link>
      </li>
      <li>
        <Link
          className="link-secondary link-opacity-75 hover:link-opacity-100"
          href="https://tailwindcss.com"
        >
          Tailwind CSS
        </Link>
      </li>
      <li>
        <Link
          className="link-secondary link-opacity-75 hover:link-opacity-100"
          href="https://www.chartjs.org/"
        >
          Chart JS
        </Link>
      </li>
    </ul>

  </div>

  <div className="flex justify-center">
    <h6 className="text-lg font-semibold">
      Data collected by{' '}
      <Link
        className="link-secondary link-opacity-75 hover:link-opacity-100 underline"
        href="https://www.worldvaluessurvey.org"
      >
        World Values Survey
      </Link>
    </h6>
    </div>
</div>

  );
};

export default Footer;
