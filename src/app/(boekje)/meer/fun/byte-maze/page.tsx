import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { ByteMazeGame } from "@/components/ByteMazeGame";

export const metadata = { title: "Bart's Byte Maze" };

export default function ByteMazePagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Bart's Byte Maze" ondertitel="Verzamel alle data en ontwijk de virussen" emoji="💾" />
      <ByteMazeGame />
    </div>
  );
}
