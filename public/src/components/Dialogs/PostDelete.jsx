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
import { deletePostRoute } from "../../utils/APIRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostDelete = (postId) => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handledeletepost = async () => {
    const { data } = await axios.delete(deletePostRoute,{ data: postId });
    if (data.status === false) {
      toast.error("Post Not Deleted", toastOptions);
    }
    if (data.status === true) {
      toast.success("Post Deleted Suucessfully", toastOptions);
    }
    setTimeout(() => {
      navigate("/posts");
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900">
        <BiTrash size={23} className="text-gray-200" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This post will be permanently deleted. Ain't no way you getting it
            back.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handledeletepost()}>
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

export default PostDelete;
