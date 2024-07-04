import axios from "axios";
import { allPostsRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import "../../css/post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { BiMessageAdd } from "react-icons/bi";
import { Navbar } from "../Navbars/Navbar";
import Footer from "../Footer";
import Hero from "./Hero";

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
  const [currUsername, setCurrUsername] = useState(null);

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
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error, Retry After Sometime", toastOptions);
    }
  };

  const handleReplyClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };

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
            />
          </header>

          <div className=" grid grid-cols-1 relative isolate px-6 lg:px-8">
            <div className="content relative ">
              <Hero
                posts={posts}
                setPosts={setPosts}
                currUserId={currUserId}
                currUsername={currUsername}
              />
            </div>

            <section>
              <ul className="z-100 lg:grid lg:grid-cols-2 lg:gap-8 ">
                {posts &&
                  posts.map((post) => (
                    <li key={post._id}>
                      <Card className="bg-gray-100 text-left px-2">
                        <CardHeader>
                          <CardTitle
                            className="cursor-pointer"
                            onClick={() => handleReplyClick(post._id)}
                          >
                            {" "}
                            {post.topic}
                          </CardTitle>
                          <CardDescription
                            className="cursor-pointer"
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
                        <CardFooter className="w-full flex flex-row justify-between">
                          <div className="w-[50%] grid grid-cols-2">
                            {post.likes.indexOf(currUserId) === -1 ? (
                              <>
                                <button onClick={() => handleLike(post._id)}>
                                  <FaRegHeart
                                    className="inline"
                                    size={23}
                                    color="red"
                                  />
                                  <sub>{post.likes.length}</sub>
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => handleLike(post._id)}>
                                  <FaHeart
                                    size={23}
                                    className="inline"
                                    color="red"
                                  />
                                  <sub>{post.likes.length}</sub>
                                </button>
                              </>
                            )}

                            <button>
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
                                <MdAttachFile
                                  className="cursor-pointer"
                                  size={23}
                                />
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

                          <div className="justify-self-end text-sm text-gray-500 post-time">
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
      <ToastContainer />
    </>
  );
}
