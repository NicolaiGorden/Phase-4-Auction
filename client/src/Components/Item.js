import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Item({id, name, start, bids}) {
    const navigate = useNavigate();

    function onItemClick(e) {
        e.preventDefault()
        navigate(`/item/${id}`)
    }

    return (
        <div class="list-item">
            <div class="list-item-info" onClick={onItemClick}>
                <div class="list-item-name">{name}</div>
                <div class="list-item-mini">This item has {bids ? bids.length : '0'} bidders.</div>
            </div>
            <div class="list-item-pricetag">
                <label>Current Bid:</label>
                <div class="list-item-start">$120.00</div>
                <div class="list-item-mini">(started at ${start})</div>
            </div>
        </div>
    )
}

export default Item;