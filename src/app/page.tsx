import { FirstVisit } from "@/components/first-visit";
import { FormatSection } from "@/components/format-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FormatSection />
        <Mission />
        <FirstVisit />
      </main>
    </>
  );
}
