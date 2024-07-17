import axios from "axios";
import { allPostsRoute } from "../../utils/APIRoutes";
import { React, useState, useEffect, lazy, Suspense } from "react";
import "../../css/post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../Navbars/Navbar";
import Footer from "../Footer";
import Hero from "./Hero";

const PostList = lazy(() => import("../PostList"));

export default function Post() {
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
        .get(allPostsRoute)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((e) => {
          // console.log(e);
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

  return (
    <>
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
            <Suspense
              fallback={
                <p className="h-48 text-xl font-semibold text-center text-white">
                  Loading...
                </p>
              }
            >
              <PostList
                posts={posts}
                currUserId={currUserId}
                setPosts={setPosts}
              />
            </Suspense>
          </section>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}
