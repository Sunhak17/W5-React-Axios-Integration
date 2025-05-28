import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleFilter() {
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/journalists').then(res => setJournalists(res.data));
    axios.get('http://localhost:5000/categories').then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (!selectedJournalist && !selectedCategory) {
      setArticles([]);
      return;
    }

    // Example with combined backend filtering
    const params = {};
    if (selectedJournalist) params.journalistId = selectedJournalist;
    if (selectedCategory) params.categoryId = selectedCategory;

    axios.get('http://localhost:5000/articles', { params })
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, [selectedJournalist, selectedCategory]);

  return (
    <div>
      <h2>Combined Filter</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <select value={selectedJournalist} onChange={e => setSelectedJournalist(e.target.value)}>
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <ul style={{ marginTop: '20px' }}>
        {articles.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleFilter;
