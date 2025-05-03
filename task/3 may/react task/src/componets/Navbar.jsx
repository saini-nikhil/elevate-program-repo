
// import React from 'react';

// const Navbar = () => {
//   return (
//     <div id="navbar">
//         <h1>Character Gallery</h1>
//       <button onClick={() => {
//   const randomId = Math.floor(Math.random() * 826) + 1;
//   window.open(`/character/${randomId}`, '_blank');
// }}>
//   Random Character
// </button>

//     </div>
//   );
// }

// export default Navbar;

// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
//   const navigate = useNavigate();

  const handleRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 826) + 1; // Max 826 characters
    window.open(`/character/${randomId}`, '_blank');
  };

  const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
  };

  return (
    <nav id="navbar">
      <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Rick & Morty Encyclopedia</h2>
      <div className="nav-buttons">
        <button onClick={handleRandomCharacter}>Random Character</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </nav>
  );
};

export default Navbar;
