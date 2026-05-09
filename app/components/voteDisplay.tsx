"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function VoteDisplay() {
  const [yesVotes, setYesVotes] = useState("0");
  const [noVotes, setNoVotes] = useState("0");

  useEffect(() => {
    const socket = io();

    socket.on("voteYes", (data: string) => {
      
        const value = Number(data.trim());
        const vote = Number(yesVotes);

        if (value > vote) {
            setYesVotes(data);
        }
    
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = io();

    socket.on("voteNo", (data: string) => {
      
        const value = Number(data.trim());
        const vote = Number(noVotes);

        if (value > vote) {
            setNoVotes(data);
        }
    
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Vote Yes: {yesVotes}
      </h1>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Vote No: {noVotes}
      </h1>

      <p className="text-sm text-zinc-500">
        Last Arduino message: {yesVotes || "None"}
      </p>
    </>
  );
}