"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function VoteDisplay() {
  const [votes, setVotes] = useState("0");


  useEffect(() => {
    const socket = io();

    socket.on("vote", (data: string) => {
      
        const value = Number(data.trim());
        const vote = Number(votes);

        if (value > vote) {
            setVotes(data);
        }
    
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Votes: {votes}
      </h1>

      <p className="text-sm text-zinc-500">
        Last Arduino message: {votes || "None"}
      </p>
    </>
  );
}