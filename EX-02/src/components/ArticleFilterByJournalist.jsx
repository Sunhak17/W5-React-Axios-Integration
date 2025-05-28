import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');

  // Fetch all articles on mount (unfiltered)
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  // Fetch articles, optionally filtered by journalist
  const fetchArticles = async (journalistId = '') => {
    try {
      const url = journalistId
        ? `http://localhost:5000/articles?journalistId=${journalistId}`
        : 'http://localhost:5000/articles';
      const response = await axios.get(url);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Fetch all journalists for the dropdown
  const fetchJournalists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/journalists');
      setJournalists(response.data);
    } catch (error) {
      console.error('Error fetching journalists:', error);
    }
  };

  // Apply the selected filter
  const applyFilter = () => {
    fetchArticles(selectedJournalist);
  };

  // Reset filter and show all articles
  const resetFilter = () => {
    setSelectedJournalist('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalist}
          onChange={e => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name}
            </option>
          ))}
        </select>

        <button onClick={applyFilter}>Apply Filters</button>
        <button onClick={resetFilter}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #{article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
