import React, { useEffect, useState } from "react";
import { allPostsRoute, getUserRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useRef } from "react";
import { UserNavbar } from "./Navbars/UserNavbar";
import CommunityStats from "./CommunityStats";
import WordCloud from "./WordCloud";
import { Separator } from "../ui/separator";
import { IoIosMail } from "react-icons/io";

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
    <div className="bg-[#242424] bg-local  h-[100vh] w-[100vw] overflow-x-hidden">
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
      {user && (
        <>
          <div className="bg-[#242424] relative isolate px-6 py-14 lg:px-8 top-10">
            <div className=" grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="grid-grid-cols-1 space-y-4 ">
                <div className="bg-[#1E1E1E] rounded-md grid grid-cols-1 space-y-4 p-8 lg:p-12 text-left text-3xl font-bold tracking-tight text-gray-200 ">
                  <div className="flex flex-row justify-between">
                    {currUserId === userId ? (
                      <h1>My Profile</h1>
                    ) : (
                      <h1>{user.username}'s Profile</h1>
                    )}
                    <a
                      href={`mailto:${user.email}`}
                      className="text-xl mt-2 font-bold tracking-tight text-gray-200"
                    >
                      <IoIosMail size={23} />
                    </a>
                  </div>

                  <Separator orientation="horizontal" className="bg-gray-600" />

                  <p className="text-xl font-bold tracking-tight text-gray-200">
                    Roll No.: {user.email.substring(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xl font-bold tracking-tight text-gray-200">
                    Year: {user.year.toUpperCase()}
                  </p>
                  <p className="text-xl font-bold tracking-tight text-gray-200">
                    Branch: {user.branch.toUpperCase()}
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
                    <Card className="px-2">
                      <CardHeader>
                        <CardTitle
                          className="cursor-pointer"
                          onClick={() => handleReplyClick(post._id)}
                        >
                          {" "}
                          {post.topic}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-36 w-full rounded-md border p-2">
                          <p>{post.text}</p>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="flex flex-row justify-between">
                        <div className="w-[50%] grid grid-cols-2">
                          {post.likes.indexOf(currUserId) === -1 ? (
                            <>
                              <button
                                onClick={() => {
                                  handleLike(post._id);
                                  setTotalLikes((n) => n + 1);
                                }}
                              >
                                <FaRegHeart
                                  className="inline"
                                  size={23}
                                  color="red"
                                />
                                <sub> {post.likes.length}</sub>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  handleLike(post._id);
                                  setTotalLikes((n) => n - 1);
                                }}
                              >
                                <FaHeart
                                  className="inline"
                                  size={23}
                                  color="red"
                                />
                                <sub> {post.likes.length}</sub>
                              </button>
                            </>
                          )}
                          <button>
                            {" "}
                            <BiMessageAdd
                              className="inline"
                              size={23}
                              onClick={() => handleReplyClick(post._id)}
                            />
                            <sub>{post.replies.length}</sub>
                          </button>
                        </div>

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

                        <div className="text-sm text-gray-500 post-time">
                          {new Date(post.createdAt).toLocaleString()}
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
      <ToastContainer />
    </div>
  );
}
