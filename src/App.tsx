import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Recommendation } from "./components/Recommendation";
import { Concept } from "./components/Concept";
import { Segments } from "./components/Segments";
import { FinancialModel } from "./components/FinancialModel";
import { Scenarios } from "./components/Scenarios";
import { SensitivityMatrix } from "./components/SensitivityMatrix";
import { Peers } from "./components/Peers";
import { StageGate } from "./components/StageGate";
import { Sources } from "./components/Sources";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main id="hero">
        <Hero />
        <Recommendation />
        <Concept />
        <Segments />
        <FinancialModel />
        <Scenarios />
        <SensitivityMatrix />
        <Peers />
        <StageGate />
        <Sources />
      </main>
      <Footer />
    </div>
  );
}
