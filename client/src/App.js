import './App.css';
import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gate from './Components/Gate';
import Items from './Components/Items';
import ItemForm from './Components/ItemForm';
import ItemPage from './Components/ItemPage';
import Navbar from './Components/Navbar';
import UserPage from './Components/UserPage';

export const LoginContext = createContext();
export const ItemContext = createContext();
export const MyItemsContext = createContext();

function App() {

  const [user, setUser] =useState('')
  const [itemList, setItemList] = useState([])
  const [myItems, setMyItems] = useState([])

  useEffect(() => {
    fetch('/items').then((res) => {
        if (res.ok) {
            res.json().then((res) => setItemList(res))
        }
    })

  }, [user])

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
          setMyItems(user.items)
        })
      }
    })
  }, [])

  if(!user) return (
    <LoginContext.Provider value={[user, setUser]}>
      <h1 class="title">EZ BID</h1>
      <Gate/>
    </LoginContext.Provider>
  )

  return (
    <MyItemsContext.Provider value={[myItems, setMyItems]}>
      <ItemContext.Provider value={[itemList, setItemList]}>
        <LoginContext.Provider value={[user, setUser]}>
          <BrowserRouter>
            <div className="App">
              <h1 class="title">EZ BID</h1>
              <Navbar/>
              <Routes>
                <Route path="/" element={<Items/>}/>
                <Route path="/login" element={<Gate/>}/>
                <Route path="/newitem" element={<ItemForm/>}/>
                <Route path="/item/:id" element={<ItemPage/>}/>
                <Route path="/myauctions" element={<UserPage/>}/>
              </Routes>
            </div>
          </BrowserRouter>
        </LoginContext.Provider>
      </ItemContext.Provider>
    </MyItemsContext.Provider>
  );
}

export default App;
