import React from 'react';
// import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
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
