import React, { useState } from "react";
import axios from 'axios';
import img1 from "../img1.png";
import img2 from "../img2.png";
import img3 from "../img3.png"; 
import img4 from "../img4.png";   
import img5 from "../img5.png";

function Navbar({ setBooks, setSearchQuery }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async () => {
        try {
            setSearchQuery(searchInput); 
            let result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`)
            setBooks(result.data.items || []); 
        } catch (error) {
            console.log('error', error);
            setBooks([]); 
        }
    };

    return (
        <nav className="navbar">
            <img className='logoimg' src={img1} alt="logo" />
            <span className="logotext">
                <h1>KeazoN</h1>
                <p>BOOKS</p>
            </span>

            <input type="text" value={searchInput} onChange={handleSearchInput} />
            <button id="search" onClick={handleSearch}>Search</button>

            <div className="iconlist" >
                <img src={img2} alt="heart" />
                <img src={img3} alt="bell" />
                <img src={img4} alt="diamond" />
                <img src={img5} alt="profile" />
            </div> 
        </nav>
    );
}

export default Navbar;

