import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import { HeroSection } from "./_components/HeroSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      {/* HEADER */}
      <Header/>
      {/* HERO SECTION */}
      <HeroSection/>

      <Footer />
    </div>
  );
}
