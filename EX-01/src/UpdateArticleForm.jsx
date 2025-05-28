import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [journalistId, setJournalistId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(res => {
        const { title, content, journalistId, categoryId } = res.data;
        setTitle(title);
        setContent(content);
        setJournalistId(journalistId);
        setCategoryId(categoryId);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { title, content, journalistId, categoryId };

    axios.put(`http://localhost:5000/articles/${id}`, updatedData)
      .then(() => navigate(`/articles/${id}`))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Article</h2>
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
      <button type="submit">Update Article</button>
    </form>
  );
}

export default UpdateArticleForm;
