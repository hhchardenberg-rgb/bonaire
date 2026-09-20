import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { SnakeGame } from "@/components/SnakeGame";

export const metadata = { title: "Charella's Snake Game" };

export default function SnakePagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Charella's Snake Game" ondertitel="Verzamel schatten, bijt jezelf niet" emoji="🐍" />
      <SnakeGame />
    </div>
  );
}
