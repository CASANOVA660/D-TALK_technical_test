import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function AboutSection() {
    return (
        <section className="min-h-screen bg-black snap-start relative overflow-hidden" id="about">
            <div className="container mx-auto px-4 h-screen relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <h2 className="text-6xl md:text-7xl font-bold text-red-600 leading-tight">
                            Bold ideas and vibrant designs are my signature.
                        </h2>

                        <div className="flex gap-6 pt-8">
                            <a href="https://github.com/CASANOVA660" target="_blank" rel="noopener noreferrer"
                                className="text-white hover:text-red-600 transition-colors">
                                <Github size={32} />
                            </a>
                            <a href="https://linkedin.com/in/bouali-med-amin" target="_blank" rel="noopener noreferrer"
                                className="text-white hover:text-red-600 transition-colors">
                                <Linkedin size={32} />
                            </a>
                            <a href="mailto:mohamedaminbouali6@ieee.org"
                                className="text-white hover:text-red-600 transition-colors">
                                <Mail size={32} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-full flex items-end"
                    >
                        <img
                            src="/me.jpeg"
                            alt="Profile"
                            className="w-full h-[90%] object-cover object-center"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}