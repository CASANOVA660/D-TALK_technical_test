# D-Movies - React Movie Management Application

A modern, responsive React application for managing and interacting with movie listings. Built with cutting-edge technologies and featuring a rich, interactive user interface.

## 🚀 Technologies

### Core
- React 18
- Vite
- Redux Toolkit
- React Router DOM v6

### Styling & UI
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React (for icons)
- Custom UI Components (Button, Card, Input)

### Development Tools
- ESLint
- PostCSS
- Autoprefixer

## ✨ Features

### Movie Display
- Responsive grid layout (1/2/4 columns based on screen size)
- Animated card transitions using Framer Motion
- Movie information display:
  - Title
  - Category
  - Like/Dislike counters
  - Interactive buttons

### Filtering & Search
- Real-time search functionality
- Multi-category filtering
- Dynamic category management:
  - Categories auto-update based on available movies
  - Auto-removal of empty categories
- Combined search and category filtering

### Movie Interactions
- Like/Dislike system:
  - Toggle-able likes and dislikes
  - Mutual exclusivity (can't like and dislike simultaneously)
  - Visual feedback for interaction states
- Delete functionality with automatic UI updates

### Pagination
- Customizable items per page (4, 8, or 12)
- Dynamic page navigation
- Previous/Next buttons
- Visual indication of current page
- Automatic page adjustment when deleting items

### UI/UX Features
- Smooth animations and transitions
- Hover effects on interactive elements
- Loading states
- Error handling
- Responsive design for all screen sizes
- Modern, clean interface with consistent styling

### State Management
- Centralized Redux store
- Memoized selectors for performance
- Efficient state updates
- Persistent state across navigation

### Navigation
- Smooth scroll functionality
- Responsive navbar
- Section-based navigation
- Landing page with animated elements

## 🛠 Project Structure
- `/src/components/ui`: Reusable UI components
- `/src/store`: Redux state management
- `/src/pages`: Main application pages
- `/src/utils`: Utility functions
- `/src/data`: Data sources and models

## 🎨 Styling
- Custom color scheme with primary red theme
- Consistent spacing and typography
- Responsive design breakpoints
- Interactive state styling (hover, focus, active)
- Smooth transitions and animations

## 🔧 Performance Optimizations
- Memoized selectors
- Efficient state updates
- Optimized renders
- Lazy loading capabilities
- Responsive image handling