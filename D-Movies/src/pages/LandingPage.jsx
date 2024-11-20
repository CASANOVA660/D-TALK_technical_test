import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Navbar from '../components/ui/Navbar'

export default function LandingPage() {
    return (
        <section className="h-screen bg-primary snap-start relative overflow-hidden" id="home">
            <div>
                <Navbar />

                <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-120px)]">
                    <div className="flex flex-col justify-end pb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-bold text-white leading-tight pl-4"
                        >
                            Discover
                            <br />
                            movies that
                            <br />
                            inspire dreams.
                        </motion.h2>
                    </div>
                    <div className="relative hidden md:block">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 45 }}
                            transition={{ duration: 1 }}
                            className="absolute right-0 bottom-0 w-96 h-96 bg-black"
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 right-8 text-white/80 flex items-center gap-2 cursor-pointer hover:text-white"
                    onClick={() => document.getElementById('movies').scrollIntoView({ behavior: 'smooth' })}
                >
                    Scroll down <ArrowDown className="animate-bounce" />
                </motion.div>
            </div>
        </section>
    )
}