import React, { useState } from "react";
import axios from "axios";
import { allPostsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { BiMessageAdd } from "react-icons/bi";
import { toast } from "react-toastify";

const PostList = ({ posts, currUserId, setPosts, setTotalLikes }) => {
  const navigate = useNavigate();
  const [isliked, setisliked] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.post(allPostsRoute, {
        postId,
        userId: currUserId,
      });
      if (setTotalLikes !== undefined) {
        if (data.likes.indexOf(currUserId) === -1) {
          setTotalLikes((n) => n - 1);
        } else {
          setTotalLikes((n) => n + 1);
        }
      }

      setPosts(
        posts.map((p) => (p._id === postId ? { ...p, likes: data.likes } : p))
      );
      setisliked(!isliked);
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
                        <FaRegHeart className="inline" size={23} color="red" />
                        <sub>{post.likes.length}</sub>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleLike(post._id)}>
                        <FaHeart size={23} className="inline" color="red" />
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
                      <MdAttachFile className="cursor-pointer" size={23} />
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

                <div className=" text-sm text-gray-500 post-time">
                  <p className="text-right">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </CardFooter>
            </Card>

            <br />
          </li>
        ))}
    </ul>
  );
};

export default PostList;
