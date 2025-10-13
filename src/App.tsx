import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { ProductViewer } from "./components/product-viewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
    </main>
  );
}
