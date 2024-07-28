import React, { useEffect, useState } from "react";
import { allPostsRoute, getUserRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { UserNavbar } from "./Navbars/UserNavbar";
import CommunityStats from "./CommunityStats";
import WordCloud from "./WordCloud";
import { Separator } from "../ui/separator";
import { IoIosMail } from "react-icons/io";
import PostList from "./PostList";
import { MutatingDots } from "react-loader-spinner";

export default function User({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
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
        // console.log(error);
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

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!user) {
    return (
      <>
        <div className="w-full h-[100vh] bg-[#242424] flex flex-row justify-around">
          <MutatingDots
            visible={true}
            height="110"
            width="110"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="15"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  }

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
            <section className="my-10 scroll-mt-24" ref={ref}>
              <PostList
                posts={posts}
                currUserId={currUserId}
                setPosts={setPosts}
                setTotalLikes={setTotalLikes}
              />
            </section>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
