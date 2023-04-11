import React from 'react';
import './App.scss';
import NavbarComponent from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import TWWaterMark from './components/WaterMark/TWWaterMark';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Home />
      <TWWaterMark />
    </div>
  );
}

export default App;
