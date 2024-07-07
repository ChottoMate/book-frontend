import { FC, useState } from "react";
import ApiService from "./service/ApiService";
import Author from "./types/Author";
import Select from "react-select";
import ReactSelect from "react-select";

type AddBookModalProps = {
    authors: [Author];
    isOpen: Boolean;
    onClose: () => void;
    onBookAdded: () => void;
}

const AddBookModal: FC<AddBookModalProps> = ({ authors, isOpen, onClose, onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [authorIds, setAuthorIds] = useState<string[]>([]);

    const registerBook = async() => {
        await ApiService.addBook(title, authorIds);
        setTitle('');
        setAuthorIds([]);
        onBookAdded();
        onClose();
    }

    const options = authors.map((author) => ({
        value: author.authorId,
        label: author.name
    }));

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div>
                <span onClick={onClose}>&times;</span>
                <h2>Add new Book</h2>
                <input type="text" value={title} onChange={ (e) => setTitle(e.target.value) } placeholder="Enter book name" />
                <Select
                    isMulti
                    options={options}
                    onChange={(value) => {
                        const authors = value.map((option) => option.value)
                        setAuthorIds(authors);
                    }} />
                <button onClick={registerBook}>Add Book</button>
            </div>
        </div>
    )
}

export default AddBookModal;