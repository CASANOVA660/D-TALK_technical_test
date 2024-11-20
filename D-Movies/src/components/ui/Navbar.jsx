import { motion } from 'framer-motion'

export default function Navbar() {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="flex justify-between items-center py-8"
        >
            <h1 className="text-4xl font-bold text-white pl-4">D-Movies</h1>
            <div className="flex items-center gap-6 pr-4">
                <button
                    onClick={() => scrollToSection('movies')}
                    className="text-white hover:opacity-80 text-lg transition-opacity"
                >
                    Movies
                </button>
                <button
                    onClick={() => scrollToSection('about')}
                    className="text-white hover:opacity-80 text-lg transition-opacity"
                >
                    About
                </button>
            </div>
        </motion.nav>
    )
}