import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import { ItemContext } from '../App';
import Item from './Item';

function UserPage() {
    const [user, setUser] = useContext(LoginContext)
    const [itemList, setItemList] = useContext(ItemContext)
    const userItems = itemList.filter(e => e.bids.some(e => e.user_id === user.id))

    console.log(userItems)

    return (
        <div class="items-page">
            {userItems.map(it => {
                return <Item
                    key={it.id}
                    id={it.id}
                    name={it.name}
                    start={it.start_price}
                    bids={it.bids}
                    highest={it?.highest_bid < 0 || it?.highest_bid == 1 ? it?.start_price : it?.highest_bid}
                />
            })}
        </div>
    )
}

export default UserPage;