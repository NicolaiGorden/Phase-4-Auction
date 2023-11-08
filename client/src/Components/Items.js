import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ItemContext } from '../App';
import Item from './Item';

function Items() {

    const [itemList, setItemList] = useContext(ItemContext)

    useEffect(() => {
        console.log('listchange')
    }, [itemList])

    return (
        <div class="items-page">
            <h2>To join an auction, click an item.</h2>
            <div>You can also <Link to="/newitem">create a new auction here</Link></div>
            {itemList?.map(item => {
                 return <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    start={item.start_price}
                    bids={item.bids}
                    highest={item?.highest_bid < 0 || item?.highest_bid == 1 ? item?.start_price : item?.highest_bid}
                />
            })}
        </div>
    )
}

export default Items