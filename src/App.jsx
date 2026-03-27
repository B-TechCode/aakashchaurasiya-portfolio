// App.jsx
// Root component — assembles all sections and applies global layout

import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import Hero    from './sections/Hero'
import About   from './sections/About'
import Skills  from './sections/Skills'
import Projects from './sections/Projects'
import Services from './sections/Services'
import Resume  from './sections/Resume'
import Contact from './sections/Contact'

export default function App() {
  return (
    /* noise-overlay adds a subtle grain texture over the entire page */
    <div className="noise-overlay min-h-screen bg-navy-900 text-slate-300">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
