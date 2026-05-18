
import VoteDisplay from "./components/voteDisplay";

export default function Home() {
  return (
    <div className="flex flex-col bg-amber-600 flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-row bg-amber-800 flex-1 w-full items-center justify-between gap-16 py-16 px-16 dark:bg-black sm:items-start">
          <VoteDisplay />
      </main>
    </div>
  );
}