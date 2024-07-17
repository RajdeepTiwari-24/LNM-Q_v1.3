import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { deleteReplyRoute } from "../../utils/APIRoutes";
import { toast } from "react-toastify";

const ReplyDelete = ({ replyId, postId, setpost }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handledeletereply = async () => {
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

  return (
    <Dialog>
      <DialogTrigger className="text-gray-200 -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7">
        <BiTrash size={23} className=" cursor-pointer my-auto right-3" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This reply will be permanently deleted. Ain't no way you getting it
            back.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handledeletereply()}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDelete;
