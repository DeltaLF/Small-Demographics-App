import React from 'react';
import './App.scss';
import NavbarComponent from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import TWWaterMark from './components/WaterMark/TWWaterMark';
import Chart from './pages/chart/Chat';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Home />
      <Chart />
      <TWWaterMark />
    </div>
  );
}

export default App;
