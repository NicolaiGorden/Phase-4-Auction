import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';

function Bid({id, amount, userId, itemId, name, onBidDelete}) {
    const [user, setUser] = useContext(LoginContext)
    
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
                    }}>Delete Bid</button> 
                </div>
                : 
                undefined}
            </div>
        </div>
    )
}

export default Bid