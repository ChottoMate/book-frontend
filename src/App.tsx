import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './BookLIst';
import AuthorList from './AuthorList';

function App() {
  const [activeTab, setActiveTab] = useState<'books' | 'authors'>('books');

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('books')} className={activeTab === 'books' ? 'active' : ''}>
          Books
        </button>
        <button onClick={() => setActiveTab('authors')} className={activeTab === 'authors' ? 'active' : ''}>
          Authors
        </button>
      </div>
      <div className="content">
        {activeTab === 'books' && <BookList />}
        {activeTab === 'authors' && <AuthorList />}
      </div>
    </div>
  );
};

export default App;
