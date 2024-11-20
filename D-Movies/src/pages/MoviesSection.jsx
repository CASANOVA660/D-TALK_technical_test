import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
    toggleCategory,
    setCurrentPage,
    toggleLike,
    deleteMovie,
    setSearchQuery,
    selectPaginatedMovies,
    selectAvailableCategories,
    selectSelectedCategories,
    selectSearchQuery
} from '../store/movieSlice'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export default function MoviesSection() {
    const dispatch = useDispatch()

    const paginatedMovies = useSelector(selectPaginatedMovies)
    const availableCategories = useSelector(selectAvailableCategories)
    const selectedCategories = useSelector(selectSelectedCategories)
    const searchQuery = useSelector(selectSearchQuery)
    const currentPage = useSelector(state => state.movies.currentPage)
    const filteredMovies = useSelector(state => state.movies.filteredMovies)
    const itemsPerPage = useSelector(state => state.movies.itemsPerPage)

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value))
    }

    const handleRating = (movieId, type) => {
        dispatch(toggleLike({ id: movieId, type }))
    }

    return (
        <section className="min-h-screen bg-white snap-start px-6 py-12" id="movies">
            <div className="max-w-7xl mx-auto">
                {/* Search Input with red border */}
                <div className="relative max-w-md mb-8">
                    <Input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-red-500 focus:border-red-600 focus:ring-red-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {availableCategories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategories.includes(category) ? "default" : "outline"}
                            onClick={() => dispatch(toggleCategory(category))}
                            className={`rounded-full transition-all duration-300 ${selectedCategories.includes(category)
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'hover:bg-red-50'
                                }`}
                        >
                            {category}
                            {selectedCategories.includes(category) && (
                                <span className="ml-2">✓</span>
                            )}
                        </Button>
                    ))}
                </div>

                {/* Movies Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {paginatedMovies.map((movie) => (
                            <motion.div
                                key={movie.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                                        <p className="text-gray-600 mb-4">{movie.category}</p>

                                        {/* Like/Dislike Section */}
                                        <div className="flex justify-between mb-4">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleRating(movie.id, 'like')}
                                                disabled={movie.hasDisliked}
                                                className={`flex items-center gap-2 ${movie.hasLiked
                                                    ? 'text-green-600 bg-green-50'
                                                    : movie.hasDisliked
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : 'hover:bg-green-50 hover:text-green-600'
                                                    }`}
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                                <span className="font-medium">{movie.likes}</span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleRating(movie.id, 'dislike')}
                                                disabled={movie.hasLiked}
                                                className={`flex items-center gap-2 ${movie.hasDisliked
                                                    ? 'text-red-600 bg-red-50'
                                                    : movie.hasLiked
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : 'hover:bg-red-50 hover:text-red-600'
                                                    }`}
                                            >
                                                <ThumbsDown className="w-4 h-4" />
                                                <span className="font-medium">{movie.dislikes}</span>
                                            </Button>
                                        </div>

                                        {/* Delete Button */}
                                        <Button
                                            variant="destructive"
                                            className="w-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                                            onClick={() => dispatch(deleteMovie(movie.id))}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* No movies found message */}
                {paginatedMovies.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No movies found matching your criteria
                    </div>
                )}

                {/* Pagination */}
                {filteredMovies.length > 0 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <Button
                            variant="outline"
                            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                            disabled={currentPage === 1}
                            className="hover:bg-red-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: Math.ceil(filteredMovies.length / itemsPerPage) }).map((_, i) => (
                            <Button
                                key={i}
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                onClick={() => dispatch(setCurrentPage(i + 1))}
                                className={`w-10 h-10 ${currentPage === i + 1
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'hover:bg-red-50'
                                    }`}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                            disabled={currentPage === Math.ceil(filteredMovies.length / itemsPerPage)}
                            className="hover:bg-red-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}