import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { ProductViewer } from "./components/product-viewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Showcase } from "./components/showcase";
import Performance from "./components/performance";
import { Highlights } from "./components/highlights";
import Features from "./components/features";
import Footer from "./components/footer";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
}
