import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setMovies } from './store/movieSlice'
import { movies$ } from './data/movies'
import LandingPage from './pages/LandingPage'
import MoviesSection from './pages/MoviesSection'
import AboutSection from './pages/AboutSection'

function page() {
    const dispatch = useDispatch()

    useEffect(() => {
        movies$.then(movies => {
            dispatch(setMovies(movies))
        })
    }, [dispatch])

    return (
        <div className="h-screen overflow-y-auto snap-y snap-mandatory">
            <LandingPage />
            <MoviesSection />
            <AboutSection />
            <footer className="bg-black text-white/60 py-4 text-center">
                Made with ♥ by MovieHub
            </footer>
        </div>
    )
}

export default page