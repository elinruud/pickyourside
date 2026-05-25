"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function VoteDisplay() {
  const [yesVotes, setYesVotes] = useState("0");
  const [noVotes, setNoVotes] = useState("0");

  const yes = Number(yesVotes || 0);
  const no = Number(noVotes || 0);

  const total = yes + no;

  const yesRatio = total === 0 ? 0.5 : yes / total;
  const noRatio = total === 0 ? 0.5 : no / total;

  const yesPercent = Math.round(yesRatio * 100);
  const noPercent = Math.round(noRatio * 100);

  useEffect(() => {
    const socket = io();

    socket.on("voteYes", (data: string) => {
      setYesVotes(data);
    });

    socket.on("voteNo", (data: string) => {
      setNoVotes(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex w-screen h-dvh relative overflow-hidden">

      {/* LEFT */}
      <div
        className="relative transition-all duration-500"
        style={{
          width: `${noRatio * 100}%`,
          backgroundColor: "#FFAE74",
        }}
      >
        {/* CHEX */}
      
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20"
          style={{ transform: "translateY(-50%) rotate(90deg)" }}
        >
          <div className="text-center text-[#444] font-bold">
            <div className="text-[28px] tracking-wide">CHEX</div>
            <div className="text-[44px] leading-none">{noVotes}</div>
          </div>
        </div>
      </div>

      
      {/* RIGHT */}
      <div
        className="relative transition-all duration-500"
        style={{
          width: `${yesRatio * 100}%`,
          backgroundColor: "#846BFF",
        }}
      >
        {/* KEX */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20"
          style={{ transform: "translateY(-50%) rotate(-90deg)" }}
        >
          <div className="text-center text-[#444] font-bold">
            <div className="text-[28px] tracking-wide">KEX</div>
            <div className="text-[44px] leading-none">{yesVotes}</div>
          </div>
        </div>
      </div>
    </div>
  );
}