import React, { useState, useEffect, useContext } from 'react';
import { ItemContext } from '../App';
import { LoginContext } from '../App';
import { Form, useParams } from 'react-router-dom';
import Bid from './Bid';


function ItemPage(props) {

    const { id } = useParams()
    const [itemList, setItemList] = useContext(ItemContext)
    const [user, setUser] = useContext(LoginContext)
    const [errors, setErrors] = useState([])
    const [item, setItem] = useState('')
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const [newBid, setNewBid] = useState('')
    const [highestBid, setHighestBid] = useState('')

    // NEW BID Form
    const [amount, setAmount] = useState('')

    function onBidDelete(key) {
        fetch(`/bids/${key}`, {
            method: "DELETE",
        })
    }

    function onBidSubmit(e) {
        e.preventDefault()
        fetch('/bids', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    amount,
                    item_id: id,
                    user_id: user.id
            }),
        })
        .then(res => {
            if(res.ok){
                res.json().then((bid) => {
                    setNewBid(bid)
                    setHighestBid((bid.amount))
                    let listCopy = [...itemList]
                    let item = {...listCopy.find(i => i.id == id)}
                    let itemIndex = listCopy.findIndex(i => i.id == id)
                    console.log(listCopy)
                    item.bids = item.bids.push(bid)
                    item.users = item.users.push(user)
                    item.highest_bid= amount
                    listCopy[itemIndex] = item                    
                })
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }


    
    useEffect(()=>{
        setHighestBid(item?.highest_bid)
        setItem(itemList.find(i => i.id == id))
        setErrors([])
    }, [itemList, item])

    
    return (
        <div class="auction-page">
            <div class="auction-page-header">
                <div class="list-item-mini">Auction for:</div>
                <div class="list-item-h-space">
                    <div class="list-item-name">{item?.name}</div>
                    <div class="auction-highest">
                        <div class="list-item-mini">highest bid:</div>
                        <div class="auction-item-price">${highestBid}</div>
                    </div>
                </div>
            </div>
            <div class="bid-form">
                <form onSubmit={onBidSubmit}>
                    <label>Post a new bid:</label>
                    <input 
                        placeholder='0.00'
                        type="number" 
                        min="1" 
                        step="any"
                        value={amount}
                        onChange={(e)=> {
                            setAmount(formatter.format(e.target.value).replace(/\$/g, ''))
                        }}
                    />
                    <button type="submit">Post Bid</button>
                </form>
                {errors ? errors.map((e) =>{
                if (e === 'User already bid!') {
                    return <div>-You are already part of this auction.</div>
                } else
                    return <div>-{e}</div>
                }
                ) : undefined}
            </div>
            <div class="bid-list">
                {/* {(itemList.find(i => i.id == id).bids?.length > 0) ? */}               
                {(itemList.length > 0 && item) ? 
                itemList.find(i => i.id == id).bids.map((e)=> {
                    return <Bid
                        key={e.id}
                        id={e.id}
                        amount={e.amount}
                        userId={e.user_id}
                        itemId={e.item_id}
                        name={item.users?.find(i => i.id === e.user_id).username}
                        onBidDelete={onBidDelete}
                    />
                })
                :
                null
                }
            </div>
        </div>
    )
}

export default ItemPage;