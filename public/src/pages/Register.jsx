import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute, deleteUnverifiedRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoading from "../ui/ButtonLoading";
import "react-toastify/dist/ReactToastify.css";

const im = require("../assets/im.jpg");

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const deleteUnverified = async () => {
      try {
        localStorage.removeItem("verificationEmail");
        const { data } = await axios.post(deleteUnverifiedRoute);
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
      } catch (error) {
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    deleteUnverified();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/posts");
    }
  }, []);

  const handleValidation = (event) => {
    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error(
        "Password should be equal or greater than 5 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (handleValidation(event)) {
      const username = event.target.elements.username.value;
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const confirmPassword = event.target.elements.confirmPassword.value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("verificationEmail", email);
        navigate("/verify");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-circuit bg-[#242424]">
        <div className=" max-w-md mx-auto bg-[#F8E7D5] rounded-xl shadow-xl border border-gray-300 overflow-hidden md:max-w-2xl">
          <div className="md:grid md:grid-cols-2">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full "
                src={im}
                alt="Basketball Illusion"
              />
            </div>
            <div className="p-8">
              <div className="p-8">
                <h2 className="font-dongpora text-6xl text-[#F1853B]">
                  Sign Up
                </h2>
                <p className="text-lg py-1 text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Username"
                    name="username"
                    min="3"
                  />
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Email"
                    name="email"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                    name="password"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  {!loading && (
                    <button
                      className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  )}{" "}
                  {loading && <ButtonLoading />}
                </form>

                <p className="text-sm text-gray-500 mt-2">
                  Existing user ?{" "}
                  <span className="text-[#1E75D5] cursor-pointer">
                    <Link to="/login">Login.</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
