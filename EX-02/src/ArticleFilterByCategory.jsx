import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleFilterByCategory() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedCategory(id);
    axios.get(`http://localhost:5000/categories/${id}/articles`)
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Filter Articles by Category</h2>
      <select value={selectedCategory} onChange={handleSelect}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <ul>
        {articles.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleFilterByCategory;
