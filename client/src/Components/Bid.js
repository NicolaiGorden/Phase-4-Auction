import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import { ItemContext } from '../App';

function Bid({id, amount, userId, itemId, name, onBidDelete}) {
    const [user, setUser] = useContext(LoginContext)
    const [itemList, setItemList] = useContext(ItemContext)
    const [editMode, setEditMode] = useState(false)
    const [errors, setErrors] = useState([])
    const [amountUpdate, setAmountUpdate] = useState('')
    const [bidAmount, setBidAmount] = useState(amount)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
   
    function handleEditMode(e) {
        e.preventDefault()
        setEditMode(!editMode)
    }

    function handlePatchSubmit(e) {
        e.preventDefault()
        fetch(`/bids/${id}`, {
            method:'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                amount: amountUpdate,
                item_id: itemId,
                user_id: userId
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setEditMode(!editMode)
                    setBidAmount(amountUpdate)
                })
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div class="bid">
            <div class="bid-info">
                <div class="bid-user">{user.id === userId ? `(YOU) ${name}'s` : `${name}'s`} bid:</div>
                <div class={user.id === userId ? "bid-amount-yours" : "bid-amount"}>
                    {editMode ?
                    <input 
                        placeholder='0.00'
                        type="number" 
                        min="1" 
                        step="any"
                        value={amountUpdate}
                        onChange={(e)=> {
                            setAmountUpdate(formatter.format(e.target.value).replace(/\$/g, ''))
                        }}
                    /> 
                    : 
                        `$${bidAmount}`
                    }
                </div>
            </div>
            <div class="edit-button">
                {user.id === userId 
                ? 
                <div>
                    {editMode ? <button onClick={handlePatchSubmit}>Submit</button>: <button onClick={handleEditMode}>Adjust Bid</button>}
                    {!editMode ? 
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
                    : 
                        null
                    }
                </div>
                : 
                undefined}
            </div>
        </div>
    )
}

export default Bid