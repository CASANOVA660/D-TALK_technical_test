import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import LandingPage from './pages/LandingPage'
import MoviesSection from './pages/MoviesSection'
import AboutSection from './pages/AboutSection'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <main className="h-screen overflow-y-auto snap-y snap-mandatory">
            <section id="home" className="snap-start">
              <LandingPage />
            </section>
            <section id="movies" className="snap-start">
              <MoviesSection />
            </section>
            <section id="about" className="snap-start">
              <AboutSection />
            </section>
          </main>
        } />
      </Routes>
    </Router>
  )
}

export default App