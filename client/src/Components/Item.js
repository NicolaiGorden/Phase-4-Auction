import React, { useState, useEffect } from 'react';

function Item({id, name, start}) {
    return (
        <div class="list-item">
            <div class="list-item-info">
                <div class="list-item-name">{name}</div>
                <div class="list-item-mini">This item has X bidders</div>
            </div>
            <div class="list-item-pricetag">
                <label>Current Bid:</label>
                <div class="list-item-start">120.00$</div>
                <div class="list-item-mini">(started at {start})</div>
            </div>
        </div>
    )
}

export default Item;