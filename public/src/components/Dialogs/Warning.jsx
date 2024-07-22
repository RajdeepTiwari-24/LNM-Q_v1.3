import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

const PrepareData = (arr) => {
  let map = new Map();
  arr.forEach((value) => map.set(value, value));
  return [...map.values()];
};

const Warning = ({ warning, setWarning }) => {
  const unsafeWords = PrepareData(warning.negative);
  return (
    <Dialog open={() => warning.comparative < 0}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Warning!!</DialogTitle>
          <DialogDescription>
            Your post cannot be added because it contains the following unsafe
            words.
          </DialogDescription>
        </DialogHeader>
        <ul>
          {unsafeWords &&
            unsafeWords.map((word, ind) => (
              <li className="font-bold text-red-500" key={ind}>
                {word}
              </li>
            ))}
        </ul>
        <DialogFooter>
          <Button variant="secondary">
            <span onClick={() => setWarning({})}>OK</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Warning;
