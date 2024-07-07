import axios from "axios";
import Author from "../types/Author";
import Book from "../types/Book";

const API_BASE_URL = 'http://localhost:8085/api/v1';


class ApiService {
    static getAllAuthors = async() => {
        try {
            const response = await axios.get<Author[]>(`${API_BASE_URL}/author/all`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch Authors');
        }
    }

    static addAuthor = async(authorName: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/author/`, { name: authorName });
            console.log('Author added:', response.data);
        } catch (error) {
            console.error('Failed to add author:', error);
        }
    }

    static getAllBooks = async() => {
        try {
            const response = await axios.get<Book[]>(`${API_BASE_URL}/book/all`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch Books');
        }
    }

    static addBook = async(title: string, authorIds: string[]) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/book/`, { title: title, authorIds: authorIds });
            console.log('Book added:', response.data);
        } catch (error) {
            console.error('Failed to add Book:', error);
        }
    }

    static updateBook = async(bookId: string, title: string | null, authorIdsAdded: string[], authorIdsRemoved: string[]) => {
        console.log(bookId, title, authorIdsAdded, authorIdsRemoved);
        try {
            const response = await axios.put(`${API_BASE_URL}/book/${bookId}`, { title: title, authorIdsAdded: authorIdsAdded, authorIdsRemoved: authorIdsRemoved });
            console.log('Book updated:', response.data);
        } catch (error) {
            console.error('Failed to update Book:', error);
        }
    }
}

export default ApiService;