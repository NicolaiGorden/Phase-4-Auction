import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [user, setUser] = useContext(LoginContext)
    const navigate = useNavigate();

    function onLogout(e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE",
        }).then(setUser(''))
    } 

    function handleAuction(e) {
        e.preventDefault()
        navigate('/')
    }

    function handleCreateTab(e) {
        e.preventDefault()
        navigate('/newitem')
    }

    if (!user) {
        return (
            <div class="nav-wrapper">
                <button> Login/Signup </button>
            </div>
        )
    } else {
        return (
            <div class="nav-wrapper">
                <button onClick={onLogout}> Log Out </button>
                <button onClick={handleAuction}> All Auctions </button>
                <button onClick={handleCreateTab}>New Auction</button>
            </div>
        )
    }
}

export default Navbar;