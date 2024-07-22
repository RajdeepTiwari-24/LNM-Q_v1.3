import { React, useState, useEffect, useRef } from "react";
import logo_bg from "../../assets/logo-bg-2.gif";
import TextTransition, { presets } from "react-text-transition";
import { PostDialog } from "../Dialogs/PostDialog";
import { Separator } from "../../ui/separator";

const Hero = ({ posts, setPosts, currUserId, currUsername }) => {
  const TEXTS = ["Talking", "Asking", "Sharing", "Connecting"];
  const [index, setIndex] = useState(0);
  const [postOpen, setPostOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className=" layer mx-auto max-w-2xl h-[100vh]  z-50 lg:relative">
        <div className=" text-center grid grid-cols-1  justify-center">
          <div className="mt-[30vh] lg:mt-40  relative  mx-auto rounded-lg ">
            <img
              src={logo_bg}
              className=" rounded-lg shadow-2xl lg:h-[40vh] lg:w-auto"
            />
            <h1 className="inline-block w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mix-blend-difference group font-thunder tracking-wide text-8xl text-transparent bg-clip-text bg-white ">
              LNM-
              <p className="font-thunderit tracking-wide text-8xl  text-transparent inline-block bg-clip-text pr-3 bg-white">
                Q
              </p>
              .
            </h1>
          </div>
          <h1 className="relative font-bold text-3xl lg:text-6xl text-white mt-8 flex flex-row gap-2 lg:gap-4 ml-[25%] ">
            Get
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </h1>

          <br />
          <button
            className="bg-[#303030] text-gray-100 border-1 p-2 px-8 lg:px-24 rounded-full  shadow-md border-gray-200 mx-auto z-2 "
            onClick={() => setPostOpen(true)}
          >
            What do you want to ask or share?
          </button>
          <PostDialog
            posts={posts}
            setPosts={setPosts}
            currUserId={currUserId}
            currUsername={currUsername}
            postOpen={postOpen}
            setPostOpen={setPostOpen}
          />

          <div className="mt-10 flex items-center justify-center gap-x-6 ">
            <button
              onClick={handleClick}
              className="text-md font-semibold leading-6 text-gray-200"
            >
              All Posts{" "}
              <span className="text-blue-400" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-600 my-8 scroll-mt-24" ref={ref} />
    </>
  );
};

export default Hero;
