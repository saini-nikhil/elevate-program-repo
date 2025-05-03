import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterGallery from './pages/CharacterGallery';
import CharacterDetail from './pages/CharacterDetail';
import Navbar from './componets/Navbar';

function App() {
  return (
    <>
   <Navbar/>
    <Router>
      <Routes>
        
        <Route path="/" element={<CharacterGallery />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
