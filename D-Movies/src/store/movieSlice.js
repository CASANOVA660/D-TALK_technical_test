import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    movies: [],
    filteredMovies: [],
    selectedCategories: [],
    currentPage: 1,
    itemsPerPage: 4,
    searchQuery: '',
    loading: false,
    error: null,
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload.map(movie => ({
                ...movie,
                hasLiked: false,
                hasDisliked: false,
                likes: movie.likes || 0,
                dislikes: movie.dislikes || 0
            }))
            state.filteredMovies = state.movies
            state.loading = false
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        toggleCategory: (state, action) => {
            const category = action.payload
            const index = state.selectedCategories.indexOf(category)
            if (index === -1) {
                state.selectedCategories.push(category)
            } else {
                state.selectedCategories = state.selectedCategories.filter(cat => cat !== category)
            }
            state.filteredMovies = state.movies.filter(movie => {
                const matchesCategories = state.selectedCategories.length === 0 ||
                    state.selectedCategories.includes(movie.category)

                const matchesSearch = state.searchQuery === '' ||
                    movie.title.toLowerCase().includes(state.searchQuery.toLowerCase())

                return matchesCategories && matchesSearch
            })

            state.currentPage = 1
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload

            state.filteredMovies = state.movies.filter(movie => {
                const matchesCategories = state.selectedCategories.length === 0 ||
                    state.selectedCategories.includes(movie.category)

                const matchesSearch = action.payload === '' ||
                    movie.title.toLowerCase().includes(action.payload.toLowerCase())

                return matchesCategories && matchesSearch
            })

            state.currentPage = 1
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },

        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload
            state.currentPage = 1
        },

        toggleLike: (state, action) => {
            const { id, type } = action.payload
            const movie = state.movies.find(m => m.id === id)
            const filteredMovie = state.filteredMovies.find(m => m.id === id)

            if (movie) {
                if (type === 'like') {
                    if (movie.hasLiked) {
                        movie.likes--
                        movie.hasLiked = false
                        if (filteredMovie) {
                            filteredMovie.likes--
                            filteredMovie.hasLiked = false
                        }
                    }
                    else if (!movie.hasDisliked) {
                        movie.likes++
                        movie.hasLiked = true
                        if (filteredMovie) {
                            filteredMovie.likes++
                            filteredMovie.hasLiked = true
                        }
                    }
                } else if (type === 'dislike') {
                    if (movie.hasDisliked) {
                        movie.dislikes--
                        movie.hasDisliked = false
                        if (filteredMovie) {
                            filteredMovie.dislikes--
                            filteredMovie.hasDisliked = false
                        }
                    }
                    else if (!movie.hasLiked) {
                        movie.dislikes++
                        movie.hasDisliked = true
                        if (filteredMovie) {
                            filteredMovie.dislikes++
                            filteredMovie.hasDisliked = true
                        }
                    }
                }
            }
        },

        deleteMovie: (state, action) => {
            const movieId = action.payload

            state.movies = state.movies.filter(movie => movie.id !== movieId)
            state.filteredMovies = state.filteredMovies.filter(movie => movie.id !== movieId)

            const remainingCategories = [...new Set(state.movies.map(movie => movie.category))]

            state.selectedCategories = state.selectedCategories.filter(
                category => remainingCategories.includes(category)
            )

            if (state.selectedCategories.length === 0) {
                state.filteredMovies = state.movies.filter(movie =>
                    movie.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            } else {
                state.filteredMovies = state.movies.filter(movie =>
                    state.selectedCategories.includes(movie.category) &&
                    movie.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            }

            const totalPages = Math.ceil(state.filteredMovies.length / state.itemsPerPage)
            if (state.currentPage > totalPages) {
                state.currentPage = Math.max(1, totalPages)
            }
        },

        resetFilters: (state) => {
            state.selectedCategories = []
            state.searchQuery = ''
            state.currentPage = 1
            state.filteredMovies = state.movies
        }
    },
})

export const {
    setMovies,
    setLoading,
    setError,
    toggleCategory,
    setSearchQuery,
    setCurrentPage,
    setItemsPerPage,
    toggleLike,
    deleteMovie,
    resetFilters
} = movieSlice.actions

export const selectAllMovies = (state) => state.movies.movies
export const selectFilteredMovies = (state) => state.movies.filteredMovies
export const selectSelectedCategories = (state) => state.movies.selectedCategories
export const selectCurrentPage = (state) => state.movies.currentPage
export const selectItemsPerPage = (state) => state.movies.itemsPerPage
export const selectSearchQuery = (state) => state.movies.searchQuery
export const selectLoading = (state) => state.movies.loading
export const selectError = (state) => state.movies.error

export const selectPaginatedMovies = (state) => {
    const { filteredMovies, currentPage, itemsPerPage } = state.movies
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredMovies.slice(startIndex, startIndex + itemsPerPage)
}

export const selectAvailableCategories = (state) => {
    return [...new Set(state.movies.movies.map(movie => movie.category))]
}

export default movieSlice.reducer