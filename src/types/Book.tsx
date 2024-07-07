import Author from "./Author";

type Book = {
    bookId: string;
    title: string;
    authors: Author[];
}

export default Book;