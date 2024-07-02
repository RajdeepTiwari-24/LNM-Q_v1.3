import axios from "axios";
import { allPostsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import "../css/post.css";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/garfield-gif-4-unscreen.gif";
import { NavPostDialog } from "../components/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useRef } from "react";
import { BiMessageAdd } from "react-icons/bi";
import logo_bg from "../assets/logo-bg-2.gif";
import TextTransition, { presets } from "react-text-transition";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
  const [currUsername, setCurrUsername] = useState(null);
  // const [isliked, setisliked] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const GetPosts = async () => {
      axios
        .get(`${allPostsRoute}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((e) => {
          console.log(e);
          toast.error(
            "Internal Server Error, Retry After Sometime",
            toastOptions
          );
        });
    };
    GetPosts();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
      setCurrUsername(username);
    }
  }, []);

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.post(allPostsRoute, {
        postId,
        userId: currUserId,
      });
      setPosts(
        posts.map((p) => (p._id === postId ? { ...p, likes: data.likes } : p))
      );
      // setisliked(!isliked);
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error, Retry After Sometime", toastOptions);
    }
  };

  const handleReplyClick = (postId) => {
    // console.log(postId);
    navigate(`/posts/${postId}`);
  };

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [postOpen, setPostOpen] = useState(false);
  const TEXTS = ["Talking", "Asking", "Sharing", "Connecting"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>
      <div className="App ">
        <div className="bg-circuit bg-[#030303] bg-local  h-[100vh] w-[100vw] overflow-x-hidden">
          <header className="absolute z-20 w-full">
            <Navbar
              currUserId={currUserId}
              currUsername={currUsername}
              posts={posts}
              setPosts={setPosts}
              postOpen={postOpen}
              setPostOpen={setPostOpen}
            />
          </header>

          <div className=" grid grid-cols-1 relative isolate px-6 lg:px-8 snap-child">
            <div className="content relative ">
              {/* <img
                src={img1}
                alt="Placeholder"
                className="layer hidden lg:block -z-20 my-auto"
              /> */}

              <div className=" layer mx-auto max-w-2xl h-[100vh]  z-50 lg:relative">
                <div className=" text-center grid grid-cols-1  justify-center">
                  <div className="mt-[30vh] lg:mt-40  relative  mx-auto rounded-lg ">
                    <img
                      src={logo_bg}
                      className=" rounded-lg shadow-2xl lg:h-[40vh] lg:w-auto"
                    />
                    <h1 className="w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mix-blend-difference group font-thunder tracking-wide text-8xl text-transparent bg-clip-text bg-white ">
                      LNM-
                      <h1 className="font-thunderit tracking-wide text-8xl  text-transparent inline-block bg-clip-text pr-3 bg-white">
                        Q
                      </h1>
                      .
                    </h1>{" "}
                  </div>
                  <h1 className="font-bold text-3xl lg:text-6xl text-white mt-8 flex flex-row gap-2 lg:gap-4 ml-[25%] ">
                    Get
                    <TextTransition springConfig={presets.wobbly}>
                      {TEXTS[index % TEXTS.length]}
                    </TextTransition>
                  </h1>

                  <br />
                  {/* <PostDialog
                    posts={posts}
                    setPosts={setPosts}
                    currUserId={currUserId}
                    currUsername={currUsername}
                  /> */}
                  <button
                    className="bg-[#303030] text-gray-100 border-1 p-2 px-8 lg:px-24 rounded-full  shadow-md border-gray-200 mx-auto z-2 "
                    onClick={() => setPostOpen(true)}
                  >
                    What do you want to ask or share?
                  </button>
                  <NavPostDialog
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
            </div>
            <section>
              <ul
                ref={ref}
                className="z-100 lg:grid lg:grid-cols-2 lg:gap-8 scroll-mt-24"
              >
                {posts &&
                  posts.map((post) => (
                    <li key={post._id}>
                      <Card className="bg-gray-100">
                        <CardHeader>
                          <CardTitle onClick={() => handleReplyClick(post._id)}>
                            {" "}
                            {post.topic}
                          </CardTitle>
                          <CardDescription
                            onClick={() => handleUsernameClick(post.userId._id)}
                          >
                            {post.username}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-36 w-full rounded-md border p-2">
                            <p>{post.text}</p>
                          </ScrollArea>
                        </CardContent>
                        <CardFooter className="grid grid-cols-3">
                          <div className="grid grid-cols-2">
                            <button
                              className="hidden lg:inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 "
                              onClick={() => handleReplyClick(post._id)}
                            >
                              {" "}
                              Reply <sub>{post.replies.length}</sub>
                            </button>
                            <button className="lg:hidden">
                              {" "}
                              <sub>{post.replies.length}</sub>
                              <BiMessageAdd
                                onClick={() => handleReplyClick(post._id)}
                              />
                            </button>
                            {post.imageUrl && (
                              <HoverCard>
                                <HoverCardTrigger>
                                  <MdAttachFile size={23} />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                  <img
                                    src={`${post.imageUrl}`}
                                    alt="image"
                                    className="h-[150px] w-[150px] mx-auto"
                                  />
                                </HoverCardContent>
                              </HoverCard>
                            )}
                          </div>
                          <div>
                            {post.likes.indexOf(currUserId) === -1 ? (
                              <>
                                <button onClick={() => handleLike(post._id)}>
                                  <FaRegHeart size={23} color="red" />
                                </button>
                                <p className="inline"> {post.likes.length}</p>
                              </>
                            ) : (
                              <>
                                <button onClick={() => handleLike(post._id)}>
                                  <FaHeart size={23} color="red" />
                                </button>
                                <p className="inline"> {post.likes.length}</p>
                              </>
                            )}
                          </div>

                          <div className="post-time">
                            <p>{new Date(post.createdAt).toLocaleString()}</p>
                          </div>
                        </CardFooter>
                      </Card>

                      <br />
                    </li>
                  ))}
              </ul>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
