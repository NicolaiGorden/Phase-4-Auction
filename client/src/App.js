import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gate from './Components/Gate';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Gate/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
