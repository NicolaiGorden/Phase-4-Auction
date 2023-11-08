import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ItemPage(props) {
    const { id } = useParams()

    return (
        <div>item {id}</div>
    )
}

export default ItemPage;