
import VoteDisplay from "./components/voteDisplay";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-700 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          
          <VoteDisplay />

        </div>
      </main>
    </div>
  );
}