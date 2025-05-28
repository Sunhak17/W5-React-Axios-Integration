import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArticleFilterByJournalist() {
  const [journalists, setJournalists] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/journalists')
      .then(res => setJournalists(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedJournalist(id);
    axios.get(`http://localhost:5000/journalists/${id}/articles`)
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Filter Articles by Journalist</h2>
      <select value={selectedJournalist} onChange={handleSelect}>
        <option value="">Select Journalist</option>
        {journalists.map(j => (
          <option key={j.id} value={j.id}>{j.name}</option>
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

export default ArticleFilterByJournalist;
