import axios from "axios";
import { useEffect, useState } from "react";
import ApiService from "./service/ApiService";
import AddBookModal from "./AddBook";
import Book from "./types/Book";
import UpdateBookModal from "./UpdatBook";
  
const BookList: React.FC = () => {
    const initialBook: Book = {bookId: "0", authors: [], title: ""};

    const [books, setBooks] = useState<Book[]>([]);
    const [book, setBook] = useState<Book>(initialBook);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [authors, setAuthors] = useState<any>([]);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleOpenRegisterModal = () => {
      fetchAuthors();
      setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
      setIsRegisterModalOpen(false);
    };

    const handleOpenUpdateModal = (book: Book) => {
      fetchAuthors();
      setBook(book);
      setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
      setIsUpdateModalOpen(false);
    };

    const fetchAuthors = async() => {
        const authors = await ApiService.getAllAuthors();
        setAuthors(authors || []);
    }

    const fetchBooks = async () => {
      const books = await ApiService.getAllBooks();
      setBooks(books || []);
      setLoading(false);
    };

    const handleBookAdded = () => {
      fetchBooks();
    }
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h1>Book List</h1>
        <button onClick={handleOpenRegisterModal}>Add Author</button>
        <AddBookModal authors={authors} isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} onBookAdded={handleBookAdded} />
        <ul>
          {books.map(book => (
            <li key={book.bookId}>
              <h2>
                {book.title} 
              </h2>
                <ul>
                  {book.authors.map((author) => (
                    <li key={author.authorId}>
                      <h3>{author.name}</h3>
                    </li>
                  ))}
                </ul>
                <div>
                  <button onClick={() => handleOpenUpdateModal(book)}>Edit book</button>
                </div>
            </li>
          ))}
        </ul>
        <UpdateBookModal book={book} authors={authors} isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} onBookUpdated={fetchBooks} />
      </div>
    );
  };
  
  export default BookList;