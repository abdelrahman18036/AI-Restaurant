
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import MenuLoadingScreen from './components/MenuLoadingScreen.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuLoadingScreen />} />
        <Route path="/:restaurantName" element={<RestaurantMenu />} />
        <Route path="/loading" element={<MenuLoadingScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;

