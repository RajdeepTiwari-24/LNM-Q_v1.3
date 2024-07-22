import React, { Fragment, useRef, useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { addPostRoute, addPostUpload } from "../../utils/APIRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAddCircleOutline } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

export function PostDialog({
  posts,
  setPosts,
  currUserId,
  currUsername,
  postOpen,
  setPostOpen,
  setWarning,
}) {
  const [file, setFile] = useState(null);
  // const cancelButtonRef = useRef(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.elements.text.value;
    const topic = event.target.elements.topic.value;
    if (text.length < 1) {
      toast.error("Text Empty", toastOptions);
      return;
    }
    if (topic.length < 1) {
      toast.error("Topic Required", toastOptions);
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", text);
      formData.append("topic", topic);
      formData.append("currusername", currUsername);
      formData.append("currUserId", currUserId);
      const { data } = await axios.post(addPostUpload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status === false && data.msg) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === false && data.sentimentResult) {
        setWarning(data.sentimentResult);
        event.target.reset();
        setPostOpen(false);
        setFile(null);
        return;
      }
      if (data.status === true) {
        toast.success("Post Added Successfully", toastOptions);
      }
      event.target.reset();
      setPostOpen(false);
      setFile(null);
      setPosts([data.post, ...posts]);
    } else {
      const { data } = await axios.post(addPostRoute, {
        text,
        topic,
        currusername: currUsername,
        currUserId,
      });
      if (data.status === false && data.msg) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === false && data.sentimentResult) {
        setWarning(data.sentimentResult);
        event.target.reset();
        setPostOpen(false);
        setFile(null);
        return;
      }
      if (data.status === true) {
        toast.success("Post Added Successfully", toastOptions);
      }
      event.target.reset();
      setPostOpen(false);
      setFile(null);
      setPosts([data.post, ...posts]);
    }
  };

  return (
    <>
      <Dialog open={postOpen}>
        <DialogContent>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <DialogHeader>
              <DialogTitle className={"flex flex-row gap-4"}>
                <MdAddCircleOutline
                  className="h-6 w-6 text-[#242424]"
                  aria-hidden="true"
                />
                What do you want to share or ask?
              </DialogTitle>
            </DialogHeader>
            <div className="px-8 flex flex-col space-y-4 my-6">
              <Input type="text" placeholder="Topic" name="topic" />
              <Textarea placeholder="Add text here." name="text" />
              <div>
                <p className="text-sm">* Upload any image if you want to.</p>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" onClick={() => setPostOpen(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
