import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const ButtonLoading = () => {
  return (
    <Button disabled className="w-full h-full p-3 rounded-md">
      <Loader2 className="mr-2 w-4 animate-spin" />
      Please wait
    </Button>
  );
};

export default ButtonLoading;
