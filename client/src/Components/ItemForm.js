import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from '../App';

function ItemForm() {

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [startPrice, setStartPrice] = useState('')
    const [errors, setErrors] = useState([])
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const [itemList, setItemList] = useContext(ItemContext)
      
    
    function onItemSubmit(e) {
        e.preventDefault()
        fetch('/items', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                start_price: startPrice,
            }),
        })
        .then(res => {
            if(res.ok){
                res.json().then((item) => {
                    console.log(item)
                    let listCopy = itemList
                    listCopy.push(item)
                    console.log(listCopy)
                    setItemList(listCopy)
                })
                setTimeout(() => {
                    navigate('/');
                  }, "1000");
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }
    

    return (
        <div>
            {errors ? errors.map((e) => {
                if (e !== "Password confirmation doesn't match Password") {
                    return <div>{e}</div>
                } else {
                    return <div>Passwords do not match!</div>
                }
            }) : undefined}
            <form onSubmit={onItemSubmit}>
                <label>Item Name:</label>
                <input
                    placeholder ="Name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <label>Starting Price (USD):</label>
                <input 
                    placeholder='0.00'
                    type="number" 
                    min="1" 
                    ste="any"
                    value={startPrice}
                    onChange={(e)=> {
                        setStartPrice(formatter.format(e.target.value).replace(/\$/g, ''))
                    }}
                />
                <button type="submit" name="post item"> Post Auction</button>
            </form>
        </div>
    )
}

export default ItemForm