import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { FirewallInvadersGame } from "@/components/FirewallInvadersGame";

export const metadata = { title: "Bart's Firewall Invaders" };

export default function FirewallInvadersPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Bart's Firewall Invaders" ondertitel="Houd de bugs en virussen buiten de deur" emoji="👾" />
      <FirewallInvadersGame />
    </div>
  );
}
