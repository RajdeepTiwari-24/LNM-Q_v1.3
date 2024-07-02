import React from "react";
import Sorting from "./Sorting";
import Filter from "./Filter";
import { NavPostDialog } from "../components/Dialog";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logout from "./Logout";
import { useState } from "react";
import logo from "../assets/Removal-689.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { MdAddCircleOutline } from "react-icons/md";

export function Navbar({
  currUserId,
  currUsername,
  posts,
  setPosts,
  postOpen,
  setPostOpen,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };
  return (
    <>
      <nav
        className="bg-[#242424] flex items-center justify-between p-4 px-8 lg:px-10 border-gray-200 drop-shadow-md"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 gap-x-6">
          <div href="#" className="flex flex-row gap-4 -m-1.5 p-1.5">
            <span className="sr-only">LNM-Q</span>
            <img className="h-10 inline-block" src={logo} alt="" />
            <h1 className="h-full my-auto font-thunder tracking-wide hidden lg:inline-block text-3xl lg:text-4xl text-white">
              LNM-
              <h1 className="my-auto font-thunderit tracking-wide hidden lg:inline-block ">
                Q .
              </h1>
            </h1>
            <Separator
              orientation="vertical"
              className="lg:mx-2 text-gray-300"
            />
          </div>
          <div>
            <Sorting
              className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7"
              posts={posts}
              setPosts={setPosts}
              username={false}
            />
          </div>
          <div>
            <Filter
              className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7"
              setPosts={setPosts}
            />
          </div>
          <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200">
            <MdAddCircleOutline onClick={() => setPostOpen(true)} size={23} />
          </button>
          <NavPostDialog
            posts={posts}
            setPosts={setPosts}
            currUserId={currUserId}
            currUsername={currUsername}
            postOpen={postOpen}
            setPostOpen={setPostOpen}
          />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
          <button
            className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-200"
            onClick={() => handleUsernameClick(currUserId)}
          >
            My Profile
          </button>
          <button
            href="#"
            className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7"
          >
            <Logout />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="bg-[#242424] lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="  fixed inset-0 z-50" />
        <Dialog.Panel className="fixed  inset-y-0 right-0 z-50 w-full overflow-y-auto bg-inherit px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button href="#" className="flex flex-row gap-4 -m-1.5 p-1.5">
              <span className="sr-only">LNM-Q</span>
              <img className="h-10 inline-block" src={logo} alt="" />
              <h1 className="my-auto  font-thunder tracking-wide  text-3xl text-white">
                LNM-
                <h1 className="inline-block font-thunderit tracking-wide  ">
                  Q .
                </h1>
              </h1>
            </button>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-white " aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <button
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white"
                  onClick={() => handleUsernameClick(currUserId)}
                >
                  My Profile
                </button>
              </div>
              <div className="py-6">
                <button
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <Logout />
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export function UserNavbar({
  currUserId,
  user,
  posts,
  setPosts,
  postOpen,
  setPostOpen,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="bg-[#242424] flex items-center justify-between p-4 px-8 lg:px-10 border-b-[1px] border-gray-500 drop-shadow-md"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 gap-x-6">
          <div href="#" className="flex flex-row gap-4 -m-1.5 p-1.5">
            <span className="sr-only">LNM-Q</span>
            <img className="h-10 inline-block" src={logo} alt="" />
            <h1 className="h-full my-auto font-thunder tracking-wide hidden lg:inline-block text-3xl lg:text-4xl text-white">
              LNM-
              <h1 className="my-auto font-thunderit tracking-wide hidden lg:inline-block ">
                Q .
              </h1>
            </h1>
            <Separator
              orientation="vertical"
              className="lg:mx-2 text-gray-300"
            />
          </div>
          <div>
            <Sorting
              className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              posts={posts}
              setPosts={setPosts}
              username={false}
            />
          </div>
          <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200">
            <MdAddCircleOutline onClick={() => setPostOpen(true)} size={23} />
          </button>
          <NavPostDialog
            posts={posts}
            setPosts={setPosts}
            currUserId={currUserId}
            currUsername={user}
            postOpen={postOpen}
            setPostOpen={setPostOpen}
          />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
          <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50">
            <Link to="/posts">Home</Link>
          </button>
          <button
            href="#"
            className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            <Logout />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="bg-[#242424] lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-inherit px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">LNM-Q</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </button>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50">
                  <Link to="/posts">Home</Link>
                </button>
              </div>
              <div className="py-6">
                <button
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  <Logout />
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
