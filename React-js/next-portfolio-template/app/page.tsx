import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LoginPage from './components/login/page';
export default function Home() {
  return (
    <>
      <Hero />
      <About/>
      <Skills/>
      <Projects/>
      <LoginPage/>
    </>
  );
}