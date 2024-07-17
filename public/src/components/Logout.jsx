import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/logout.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Dialog>
      <DialogTrigger className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-6 text-gray-200 h-auto">
        LOGOUT
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leaving Already?</DialogTitle>
          <DialogDescription>
            You will be logged out from this device.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleClick}>
            Logout
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
