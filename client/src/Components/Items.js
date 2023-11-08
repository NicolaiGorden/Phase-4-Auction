import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';

function Items() {

    const [itemList, setItemList] = useState([])

    useEffect(() => {
        fetch('/items').then((res) => {
            if (res.ok) {
                res.json().then((res) => setItemList(res))
            }
        })

    }, [])

    return (
        <div class="items-page">
            <h2>To bid, click an item.</h2>
            <div>You can also <Link to="/newitem">create a new auction here</Link></div>
            {itemList.map(item => {
                 return <Item
                    id={item.id}
                    name={item.name}
                    start={item.start_price}
                />
            })}
        </div>
    )
}

export default Items