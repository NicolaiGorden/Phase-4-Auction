import './App.css';
import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gate from './Components/Gate';
import Items from './Components/Items';
import ItemForm from './Components/ItemForm';

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

  if(!user) return (
    <LoginContext.Provider value={[user, setUser]}>
      <Gate/>
    </LoginContext.Provider>
  )

  return (
    <LoginContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Items/>}/>
            <Route path="/login" element={<Gate/>}/>
            <Route path="/newitem" element={<ItemForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
