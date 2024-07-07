import axios from "axios";
import { useState } from "react";
import ApiService from "./service/ApiService";

interface AddAuthorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthorAdded: () => void;
  }
  
const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ isOpen, onClose, onAuthorAdded }) => {
    const [authorName, setAuthorName] = useState('');

    const handleSubmit = async () => {
        await ApiService.addAuthor(authorName);
        onAuthorAdded(); // 新しいAuthorを追加した後にコールバックを呼び出す
        setAuthorName('');
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div>
                <span onClick={onClose}>&times;</span>
                <h2>Add New Author</h2>
                <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Enter author name" />
                <button onClick={handleSubmit}>Add Author</button>
            </div>
        </div>
    );
};

export default AddAuthorModal;