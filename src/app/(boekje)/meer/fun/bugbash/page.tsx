import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { BugBashGame } from "@/components/BugBashGame";

export const metadata = { title: "Bart's Bug Bash" };

export default function BugBashPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Bart's Bug Bash" ondertitel="Tik de bugs weg voor de server crasht" emoji="🐛" />
      <BugBashGame />
    </div>
  );
}
