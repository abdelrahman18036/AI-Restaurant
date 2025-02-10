
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import MenuLoadingScreen from './components/MenuLoadingScreen.jsx';
import Login from './components/dashboard/Login.jsx';
import Register from './components/dashboard/Register.jsx';
import SideBar from './components/dashboard/SideBar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Modal from './components/dashboard/Modal.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuLoadingScreen />} />
        <Route path="/:restaurantName" element={<RestaurantMenu />} />
        <Route path="/loading" element={<MenuLoadingScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/side" element={<SideBar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modal" element={<Modal />} />
        </Routes>
    </Router>
  );
}

export default App;

