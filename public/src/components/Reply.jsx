import React, { useEffect, useState } from "react";
import { allPostsRoute, deleteReplyRoute } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/reply.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReplyDialog } from "./Dialogs/ReplyDialog";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BiMessageAdd } from "react-icons/bi";
import { ReplyNavbar } from "./Navbars/ReplyNavbar";
import { BsArrowReturnRight } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";

export default function Reply({ postId }) {
  const navigate = useNavigate();
  const [post, setpost] = useState(null);
  const [currUserId, setCurrUserId] = useState(null);
  const [currUsername, setCurrUsername] = useState(null);
  const [isliked, setisliked] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const GetPost = async () => {
      try {
        const { data } = await axios.get(`${allPostsRoute}/${postId}`);
        setpost(data.post);
      } catch (error) {
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    GetPost();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
      setCurrUsername(username);
    }
  }, []);

  const handledeletereply = async (replyId) => {
    const { data } = await axios.post(deleteReplyRoute, {
      postId,
      replyId,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success(data.msg, toastOptions);
    }
    setpost(data.post);
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.post(`${allPostsRoute}/${postId}`, {
        userId: currUserId,
      });
      const updatedPost = { ...post, likes: data.likes };
      setpost(updatedPost);
      setisliked(!isliked);
    } catch (error) {
      toast.error("Internal Server Error, Retry After Sometime", toastOptions);
    }
  };

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };

  if (!post) {
    return <>Loading...</>;
  }
  // console.log(currUserId);
  // console.log(post);

  return (
    <>
      <div className="App">
        <div className="bg-[#242424]  h-[100vh] w-[100vw] overflow-x-hidden">
          <header className="absolute z-20 w-full">
            <ReplyNavbar
              post={post}
              setpost={setpost}
              postId={postId}
              currUserId={currUserId}
              currUsername={currUsername}
              toast={toast}
              toastOptions={toastOptions}
            />
          </header>
          <div className="post-section relative py-28 px-8">
            {post && (
              <>
                {/* <div className="relative isolate px-6 py-14 lg:px-8 "> */}
                <Card className="mx-auto text-left lg:p-2 lg:max-w-[50vw] ">
                  <CardHeader>
                    <CardTitle className="text-xl lg:text-3xl font-bold">
                      {" "}
                      {post.topic}
                    </CardTitle>
                    <CardDescription
                      className="cursor-pointer flex flex-row justify-between space-x-2"
                      onClick={() => handleUsernameClick(post.userId)}
                    >
                      <div className="text-lg lg:text-2xl">
                        {" "}
                        {post.username}
                      </div>
                      <div className="text-sm lg:text-md">
                        {new Date(post.createdAt).toLocaleString()}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.imageUrl && (
                      <img
                        src={`${post.imageUrl}`}
                        alt="image"
                        className="mx-auto mb-4"
                      />
                    )}
                    <p className="font-bold inline-block">
                      @{post.username} :{" "}
                    </p>
                    <p className="text-lg inline-block">{post.text}</p>
                  </CardContent>
                  <CardFooter className="flex flex-row justify-around">
                    {post.likes.indexOf(currUserId) === -1 ? (
                      <>
                        <button onClick={() => handleLike(post._id)}>
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
                        <button onClick={() => handleLike(post._id)}>
                          <FaHeart className="inline" size={23} color="red" />
                          <sub> {post.likes.length}</sub>
                        </button>
                      </>
                    )}
                    <button onClick={() => setReplyOpen(true)}>
                      <BiMessageAdd className="inline" size={23} />
                      <sub>{post.replies.length}</sub>
                    </button>
                    <ReplyDialog
                      postId={postId}
                      setpost={setpost}
                      currUserId={currUserId}
                      currUsername={currUsername}
                      replyOpen={replyOpen}
                      setReplyOpen={setReplyOpen}
                    />
                  </CardFooter>
                </Card>
                <div className="text-gray-200 p-6">
                  <p className="text-2xl text-left my-6">Replies:</p>
                  <ul className="grid grid-cols-1 space-y-2">
                    {post.replies &&
                      post.replies.map((reply) => (
                        <li
                          key={reply._id}
                          className=" bg-[#1E1E1E] w-full flex flex-row gap-4 p-2 px-6"
                        >
                          <BsArrowReturnRight className="my-auto" />
                          <div className="flex-initial w-[90%] text-left">
                            <div className="flex flex-row gap-6">
                              <p
                                className=" text-left font-bold text-xl cursor-pointer"
                                onClick={() =>
                                  handleUsernameClick(reply.userId)
                                }
                              >
                                @{reply.username}{" "}
                              </p>
                              <p className="text-left text-sm text-gray-400">
                                {new Date(reply.createdAt).toLocaleString()}
                              </p>
                            </div>

                            <p className="flex-none">{reply.text}</p>
                          </div>

                          {(currUserId === reply.userId ||
                            currUserId === post.userId) && (
                            <>
                              <BiTrash
                                size={23}
                                className="cursor-pointer my-auto right-3"
                                onClick={() => handledeletereply(reply._id)}
                              />
                              <br />
                            </>
                          )}

                          <br />
                        </li>
                      ))}
                    {post.replies.length === 0 && (
                      <p className="text-left">Nothing to see here!!</p>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
