import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { ProductViewer } from "./components/product-viewer";

export function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
    </main>
  );
}
