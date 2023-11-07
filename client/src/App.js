import './App.css';
import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gate from './Components/Gate';

export const LoginContext = createContext();

function App() {

  const [user, setUser] =useState('')

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
        })
      }
    })
  }, [])

  return (
    <LoginContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Gate/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
