import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
const CommunityStats = ({ posts, totalLikes }) => {
  return (
    <div className="grid grid-cols-1 space-y-2 text-left p-8 lg:px-12 rounded-md text-gray-200 bg-[#1E1E1E]">
      <h1 className="text-2xl m-2 font-semibold">Community Statistics</h1>
      <Separator className="bg-gray-600" orientation="horizontal" />
      <p className="text-xl">Posts : {posts.length}</p>
      <p className="text-xl">Likes : {totalLikes}</p>
      <p className="text-xl">
        Last Posted : {posts[0].createdAt.substring(0, 10)}
      </p>
    </div>
  );
};

export default CommunityStats;
