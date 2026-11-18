import Hero from "@/components/sections/Hero";
import { About, Skills, Projects, Education, Certifications, Contact, Footer, Nav } from "@/components/sections/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
