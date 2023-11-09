import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import { ItemContext } from '../App';

function Bid({id, amount, userId, itemId, onBidDelete, item, name}) {
    const [user, setUser] = useContext(LoginContext)
    const [itemList, setItemList] = useContext(ItemContext)
    const [editMode, setEditMode] = useState(false)
    const [errors, setErrors] = useState([])
    const [amountUpdate, setAmountUpdate] = useState(amount)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
   
    useEffect(() => {
        console.log(itemList.filter(bid => bid.id === itemId))
    }, [])

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
                    let itemCopy = {...item}
                    itemCopy.bids = item.bids.filter(bid => bid.id !== id)
                    itemCopy.bids = [...itemCopy.bids, data]
                    if (data.amount > itemCopy.highest_bid) {
                        itemCopy.highest_bid = data.amount
                    }
                    let listCopy = itemList.map((it) => {
                        if (it.id === itemCopy.id) {
                            return itemCopy
                        } else {
                            return it
                        }
                    })
                    setItemList(listCopy)

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
                {errors ? errors.map((e, i) => <div class="update-error" key={i}>{e}</div>) : null}
                <div class={user.id === userId ? "bid-amount-yours" : "bid-amount"}>
                    {editMode ?
                    <input 
                        type="number" 
                        min="1" 
                        step="any"
                        value={amountUpdate}
                        onChange={(e)=> {
                            setAmountUpdate(formatter.format(e.target.value).replace(/\$/g, ''))
                        }}
                    /> 
                    : 
                        `$${amount}`
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
                            let itemCopy = {...item}
                            itemCopy.bids = item.bids.filter(bid => bid.id !== id)
                            itemCopy.highest_bid = (Math.max(...itemCopy.bids.map((it) => it.amount)))
                            let listCopy = itemList.map((it) => {
                                if (it.id === itemCopy.id) {
                                    return itemCopy
                                } else {
                                    return it
                                }
                            })
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