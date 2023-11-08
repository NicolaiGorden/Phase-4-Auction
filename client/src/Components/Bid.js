import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import { ItemContext } from '../App';

function Bid({id, amount, userId, itemId, name, onBidDelete}) {
    const [user, setUser] = useContext(LoginContext)
    const [itemList, setItemList] = useContext(ItemContext)
   
    return (
        <div class="bid">
            <div class="bid-info">
                <div class="bid-user">{user.id === userId ? `(YOU) ${name}'s` : `${name}'s`} bid:</div>
                <div class={user.id === userId ? "bid-amount-yours" : "bid-amount"}>${amount}</div>
            </div>
            <div class="edit-button">
                {user.id === userId 
                ? 
                <div>
                    <button>Edit Bid</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        onBidDelete(id)
                        let listCopy = [...itemList]
                        console.log(listCopy)
                        let item = {...listCopy.find(i => i.id == itemId)}
                        let itemIndex = listCopy.findIndex(i => i.id == itemId)
                        item.bids = itemList.find(i => i.id == itemId).bids?.filter(bid => bid.id !== id)
                        item.users = itemList.find(i => i.id == itemId).users?.filter(u => u.id !== user.id)
                        listCopy[itemIndex] = item
                        setItemList(listCopy)
                    }}>Delete Bid</button> 
                </div>
                : 
                undefined}
            </div>
        </div>
    )
}

export default Bid