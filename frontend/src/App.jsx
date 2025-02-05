
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import MenuLoadingScreen from './components/MenuLoadingScreen.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>TESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSST</h1>} />
        <Route path="/:restaurantName" element={<RestaurantMenu />} />
        <Route path="/loading" element={<MenuLoadingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
