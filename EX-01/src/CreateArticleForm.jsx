import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [journalistId, setJournalistId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const articleData = {
      title,
      content,
      journalistId,
      categoryId,
    };

    axios.post('http://localhost:5000/articles', articleData)
      .then(() => {
        setTitle('');
        setContent('');
        setJournalistId('');
        setCategoryId('');
        navigate('/')
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Article</h2>
      <div>
        <label>Title:</label><br />
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Content:</label><br />
        <textarea value={content} onChange={e => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Journalist ID:</label><br />
        <input value={journalistId} onChange={e => setJournalistId(e.target.value)} required />
      </div>
      <div>
        <label>Category ID:</label><br />
        <input value={categoryId} onChange={e => setCategoryId(e.target.value)} required />
      </div>
      <button type="submit">Add Article</button>
    </form>
  );
}

export default CreateArticleForm;
