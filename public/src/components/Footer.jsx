import React from "react";
import { FaGithub } from "react-icons/fa";
import logo from "../assets/Removal-689.png";

const Footer = () => {
  return (
    <footer className="mt-10 mb-0 w-full text-center flex flex-col space-y-10">
      <p className="font-semibold text-lg text-neutral-50/[0.6]">Made by:</p>
      <div className="grid grid-cols-3 lg:grid-cols-7  lg:space-x-4">
        <a
          className="col-start-2 lg:col-start-3 min-w-48 "
          href="https://github.com/RajdeepTiwari-24"
          target="_blank"
        >
          <div className=" bg-[#242424] flex flex-row space-x-2 p-4 rounded">
            {" "}
            <img
              src="https://avatars.githubusercontent.com/u/74827529?v=4"
              alt=""
              className="rounded-full h-20"
            />{" "}
            <p className="my-auto text-gray-300 font-semibold  text-lg">
              Rajdeep Tiwari
            </p>
          </div>
        </a>
        <a
          className="col-start-2 lg:col-start-4 min-w-48 my-4 lg:my-0"
          href="https://github.com/Sahil-Sidana"
          target="_blank"
        >
          <div className=" bg-[#242424] flex flex-row space-x-2 p-4 rounded">
            {" "}
            <img
              src="https://avatars.githubusercontent.com/u/115336258?v=4"
              alt=""
              className="rounded-full h-20"
            />{" "}
            <p className="my-auto text-gray-300 font-semibold  text-lg">
              Sahil Sidana
            </p>
          </div>
        </a>
        <a
          className="col-start-2 lg:col-start-5 min-w-48"
          href="https://github.com/Tushars815"
          target="_blank"
        >
          <div className=" bg-[#242424] flex flex-row space-x-2 p-4 rounded">
            {" "}
            <img
              src="https://avatars.githubusercontent.com/u/96690270?v=4"
              alt=""
              className="rounded-full h-20"
            />{" "}
            <p className="my-auto text-gray-300 font-semibold  text-lg">
              Tushar Sharma
            </p>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-6 p-8 bg-[#242424] text-neutral-50/[0.6] text-xs">
        <div className="col-start-1 col-span-4 text-start space-y-5 ml-8">
          <img src={logo} className="w-16" alt="" />
          <p>
            To inspire powerful conversations among college members so together
            we can make our college a better place.
          </p>
        </div>
        <div className="col-start-6 text-start space-y-4">
          <p className="text-2xl">Reach Us</p>
          <p>Email: lnmiitsocial@gmail.com</p>
          <div className="flex flex-row space-x-4">
            <p className="align-bottom">Fork us on Github:</p>
            <a
              href="https://github.com/RajdeepTiwari-24/LNM-Q_1.2"
              target="_blank"
              className="inline-block"
            >
              <FaGithub size={23} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
