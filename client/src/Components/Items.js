import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ItemContext } from '../App';
import Item from './Item';

function Items() {

    const [itemList, setItemList] = useContext(ItemContext)

    return (
        <div class="items-page">
            <h2>To bid, click an item.</h2>
            <div>You can also <Link to="/newitem">create a new auction here</Link></div>
            {itemList?.map(item => {
                 return <Item
                    id={item.id}
                    name={item.name}
                    start={item.start_price}
                    bids={item.bids}
                    highest={item.highest_bid}
                />
            })}
        </div>
    )
}

export default Items