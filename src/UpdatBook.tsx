import { FC, useState } from "react";
import Book from "./types/Book";
import ApiService from "./service/ApiService";
import Author from "./types/Author";
import Select, { MultiValue } from "react-select";

type UpdateBookProps = {
    book: Book;
    authors: Author[];
    isOpen: boolean;
    onClose: () => void;
    onBookUpdated: () => void;
}

type Option = {
    label: string;
    value: string;
}

const UpdateBookModal : React.FC<UpdateBookProps> = ({ book, authors, isOpen, onClose, onBookUpdated }) => {
    const [title, setTitle] = useState<string | null>(null);
    const [authorIds, setAuthorIds] = useState<string[]>([]);
    // const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
    const [authorsToRemoved, setAuthorsToRemoved] = useState<Author[]>([]);
    const [authorsToAdd, setAuthorsToAdd] = useState<Author[]>([]);

    const options = authors.map((author) => ({
        value: author.authorId,
        label: author.name
    }));

    const convertToOptions = (authors: Author[]) => {
        const options = authors.map((author) => ({
            value: author.authorId,
            label: author.name
        }));
        return options;
    }

    const handleChange = (selectedOptions: MultiValue<Option>) => {
        const selectedAuthors: Author[] = selectedOptions.map((selectedOption) => ({
                authorId: selectedOption.value,
                name: selectedOption.label
        }));

        if (selectedAuthors.length > book.authors.length) {
            const authorAdded = selectedAuthors.filter(selectedAuthor => 
                !book.authors.some(author =>
                    JSON.stringify(selectedAuthor) === JSON.stringify(author)
                )
            );
            setAuthorsToAdd([...authorAdded]);
        } else {
            const authorRemoved = book.authors.filter(author => 
                !selectedAuthors.some(selectedAuthor =>
                    JSON.stringify(selectedAuthor) === JSON.stringify(author)
                )
            );
            setAuthorsToRemoved([...authorRemoved]);
        }
    };

    const handleUpdate = () => {
        const authorIdsAdded = authorsToAdd.map(authorToAdd => authorToAdd.authorId);
        const authorIdsDeleted = authorsToRemoved.map(authorToRemoved => authorToRemoved.authorId);
        ApiService.updateBook(book.bookId, title, authorIdsAdded, authorIdsDeleted);
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div>
                <span onClick={onClose}>&times;</span>
                <h2>Edit Book</h2>
                <input type="text" defaultValue={book.title} onChange={ (e) => setTitle(e.target.value) } placeholder="Enter book name" />
                <Select
                    isMulti
                    defaultValue={convertToOptions(book.authors)}
                    options={options}
                    onChange={handleChange} />
                <button onClick={handleUpdate}>Update Book</button>
                <br />
                <h3>Authors to Delete:</h3>
                <ul>
                    {authorsToRemoved.map(author => (
                    <li key={author.authorId}>{author.name}</li>
                    ))}
                </ul>
                <h3>Authors to Add:</h3>
                <ul>
                    {authorsToAdd.map(author => (
                    <li key={author.authorId}>{author.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UpdateBookModal;