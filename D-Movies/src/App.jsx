import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setMovies } from './store/movieSlice'
import { movies$ } from './data/movies'
import LandingPage from './pages/LandingPage'
import MoviesSection from './pages/MoviesSection'
import AboutSection from './pages/AboutSection'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    movies$.then(movies => {
      dispatch(setMovies(movies))
    })
  }, [dispatch])

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