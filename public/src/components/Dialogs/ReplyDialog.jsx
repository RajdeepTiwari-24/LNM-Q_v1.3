import React from "react";
import axios from "axios";
import { addReplyRoute } from "../../utils/APIRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiMessageAdd } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export function ReplyDialog({
  postId,
  setpost,
  currUserId,
  currUsername,
  replyOpen,
  setReplyOpen,
}) {
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
    if (text.length < 1) {
      toast.error("Empty", toastOptions);
      return false;
    }
    const { data } = await axios.post(addReplyRoute, {
      text,
      currUsername,
      userId: currUserId,
      postId,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("Reply Added Successfully", toastOptions);
    }
    event.target.elements.text.value = "";
    setReplyOpen(false);
    setpost(data.post);
  };

  return (
    <>
      <Dialog open={replyOpen}>
        <DialogContent>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <DialogHeader>
              <DialogTitle className={"flex flex-row gap-4"}>
                <BiMessageAdd
                  className="h-6 w-6 text-[#242424]"
                  aria-hidden="true"
                />
                Add Reply
              </DialogTitle>
            </DialogHeader>
            <div className="px-8 my-6">
              <Input type="text" placeholder="Reply" name="text" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" onClick={() => setReplyOpen(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Reply</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
