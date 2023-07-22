import React, { useEffect, useState } from "react";
import axios from "axios";

function Displaybooks({ searchQuery }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async (query) => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
                );
                const booksData = response.data.items || [];
                setBooks(booksData);
            } catch (error) {
                console.log(error);
                setBooks([]); 
            }
        };

        fetchBooks(searchQuery);
    }, [searchQuery]);

    const handleReadNow = (link) => {
        window.open(link, "_blank");
    };

    const handleMoreInfo = (link) => {
        window.open(link, "_blank"); 
    };
    
        return (
            <div className="booksdiv">
                <div className="gridContainer">
                    {books.length > 0 &&
                        books.slice(0, 3).map((book, index) => (
                            <div key={index} className="gridBook">
                                <div className="images">
                                    <img src={book.volumeInfo?.imageLinks?.thumbnail} alt="books" />
                                </div>
                                <div className="details">
                                    <h3>{book.volumeInfo?.title}</h3>
                                    <p>{book.volumeInfo?.description}</p> 

                                    <div className="buttons">
                                    <button onClick={() => handleReadNow(book.volumeInfo?.previewLink)}>
                                        Read Now
                                    </button>
                                    <button onClick={() => handleMoreInfo(book.volumeInfo?.infoLink)}>
                                        More Info
                                    </button>
                                </div>

                                </div>
                            </div>
                        ))}
                </div>
    
                <h2 className="more">More Books</h2>
                <div className="wrappedContainer">
                    {books.length > 0 &&
                        books.slice(3).map((book, index) => (
                            <div key={index} className="wrappedBook">
                                <div>
                                    <img src={book.volumeInfo?.imageLinks?.thumbnail} alt="books" />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
    
    export default Displaybooks;
    