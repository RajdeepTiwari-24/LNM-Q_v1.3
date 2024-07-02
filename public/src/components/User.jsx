import React, { useEffect, useState } from "react";
import { allPostsRoute } from "../utils/APIRoutes";
import Logout from "./Logout";
import Sorting from "./Sorting";
import axios from "axios";
import { getUserRoute } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import "../css/post.css";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import img1 from "../assets/41656138_327153188042489_2142840811958576807_n.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useRef } from "react";
import logo from "../assets/Removal-689.png";
import { UserNavbar } from "./Navbar";
import CommunityStats from "./CommunityStats";
import WordCloud from "./WordCloud";
import Footer from "./Footer";
import { Separator } from "./ui/separator";

export default function User({ userId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
  const [isliked, setisliked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [postOpen, setPostOpen] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${getUserRoute}/${userId}`);
        data.posts.reverse();
        setPosts(data.posts);
        setUser(data);
        for (let post of data.posts) {
          setTotalLikes((n) => n + post.likes.length);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    fetchData();
    if (localStorage.getItem("USER")) {
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
    }
  }, []);

  const handleReplyClick = (postId) => {
    navigate(`/posts/${postId}`);
  };
  const handleLike = async (postId) => {
    try {
      // if (isliked) setTotalLikes((n) => n - 1);
      // else setTotalLikes((n) => n + 1);
      const { data } = await axios.post(allPostsRoute, {
        postId,
        userId: currUserId,
      });
      setPosts(
        posts.map((p) => (p._id === postId ? { ...p, likes: data.likes } : p))
      );
      setisliked(!isliked);
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error, Retry After Sometime", toastOptions);
    }
  };
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#242424] h-full">
      <header className="sticky inset-x-0 top-0 z-50">
        <header className="absolute z-20 w-full">
          <UserNavbar
            currUserId={currUserId}
            user={user}
            posts={posts}
            setPosts={setPosts}
            postOpen={postOpen}
            setPostOpen={setPostOpen}
          />
        </header>
      </header>
      {user && (
        <>
          <div className="bg-[#242424] relative isolate px-6 pt-14 lg:px-8 top-10">
            <div className=" grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="grid-grid-cols-1 space-y-4 ">
                <div className="bg-[#1E1E1E] grid grid-cols-1 space-y-4 p-8 lg:p-12 text-left text-3xl font-bold tracking-tight text-gray-200 ">
                  {currUserId === userId ? (
                    <h1>My Profile</h1>
                  ) : (
                    <h1>{user.username}'s Profile</h1>
                  )}
                  <Separator orientation="horizontal" className="bg-gray-600" />
                  <p className="text-xl mt-2 font-bold tracking-tight text-gray-200">
                    Email: {user.email}
                  </p>
                  <p className="text-xl font-bold tracking-tight text-gray-200">
                    Year: {user.year}
                  </p>
                  <p className="text-xl font-bold tracking-tight text-gray-200">
                    Branch: {user.branch}
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 ">
                    <button
                      onClick={handleClick}
                      className="text-lg font-semibold leading-6 text-gray-200"
                    >
                      All Posts{" "}
                      <span className="text-blue-400" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>
                <CommunityStats posts={posts} totalLikes={totalLikes} />
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <WordCloud className="bg-white" posts={posts} />
              </div>
            </div>

            <ul
              ref={ref}
              className="z-100 lg:grid lg:grid-cols-2 gap-4 my-10 scroll-mt-24"
            >
              {posts &&
                posts.map((post) => (
                  <li key={post._id}>
                    <Card>
                      <CardHeader>
                        <CardTitle onClick={() => handleReplyClick(post._id)}>
                          {" "}
                          {post.topic}
                        </CardTitle>
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
                              <button
                                onClick={() => {
                                  handleLike(post._id);
                                  setTotalLikes((n) => n + 1);
                                }}
                              >
                                <FaRegHeart size={23} color="red" />
                              </button>
                              <p className="inline"> {post.likes.length}</p>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  handleLike(post._id);
                                  setTotalLikes((n) => n - 1);
                                }}
                              >
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
            {/* </div> */}
          </div>
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
}
