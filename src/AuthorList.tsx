import axios from "axios";
import { useEffect, useState } from "react";
import AddAuthorModal from "./AddAuthor";
import ApiService from "./service/ApiService";


  
const AuthorList: React.FC = () => {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAuthorAdded = () => {
        fetchAuthors(); // 新しいAuthorが追加された後に一覧を再読み込みする
        setIsModalOpen(false); // モーダルを閉じる
        };

    const fetchAuthors = async () => {
        const authors = await ApiService.getAllAuthors();
        setAuthors(authors || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
        <h1>Author List</h1>
        <button onClick={handleOpenModal}>Add Author</button>
        <AddAuthorModal isOpen={isModalOpen} onClose={handleCloseModal} onAuthorAdded={handleAuthorAdded} />
        <ul>
            {authors.map(author => (
            <li key={author.authorId}>
                <h2>{author.name}</h2>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default AuthorList;