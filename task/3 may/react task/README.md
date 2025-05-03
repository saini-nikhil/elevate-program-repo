# Rick & Morty Encyclopedia

A React application built with Vite that serves as an encyclopedia for Rick and Morty characters. Browse characters, view details, and explore random characters with theme switching capabilities.

## 🌟 Features

- Browse paginated character gallery
- View detailed character information
- Random character selector
- Dark/Light theme toggle
- Live clock display
- Responsive design

## 🛠️ Tech Stack

- React 19
- Vite 6
- React Router DOM 7
- Axios
- Day.js

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm/yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd react-task
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [live link](https://elevate-program-repo-pobf.vercel.app) in your browser

## 📂 Project Structure

```
react-task/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CharacterCard.jsx
│   │   ├── FooterClock.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── CharacterDetail.jsx
│   │   └── CharacterGallery.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔍 Components

### Navbar
- App title
- Random character navigation
- Theme toggle

### CharacterGallery
- Displays character grid
- Pagination controls
- Character cards

### CharacterDetail
- Detailed character information
- Character stats and details
- Image display

### CharacterCard
- Character preview card
- Basic character info
- Link to detailed view

### FooterClock
- Real-time clock display
- Date display
- Auto-updating

## 🎨 Styling

The application uses CSS for styling with features including:
- Grid layout
- Responsive design
- Dark/Light theme
- Card-based UI
- Custom navigation

## 🔄 API Integration

This project uses the [Rick and Morty API](https://rickandmortyapi.com/) for character data:
- Character listings
- Individual character details
- Pagination support

## 🛣️ Routes

- `/` - Character Gallery
- `/character/:id` - Character Detail View

## 🎯 Future Enhancements

- Add search functionality
- Implement filters
- Add episode listings
- Improve responsive design
- Add more theme options
- Implement caching

