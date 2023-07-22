import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Displaybooks from "./components/Displaybooks";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(["harry potter", "Sherlock Holmes"]);


  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

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

  return (
    <div className="App">
      <Navbar setBooks={setBooks} setSearchQuery={setSearchQuery} />
      <Displaybooks books={books} searchQuery={searchQuery} />
    </div>
  );
}

export default App;

