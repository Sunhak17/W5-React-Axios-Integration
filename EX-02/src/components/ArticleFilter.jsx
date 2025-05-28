import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);

  // State for selected filters
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  // Fetch all articles (or filtered if filters applied)
  const fetchArticles = async (journalistId = '', categoryId = '') => {
    try {
      // Build query params based on filters
      let query = '';
      if (journalistId || categoryId) {
        const params = [];
        if (journalistId) params.push(`journalistId=${journalistId}`);
        if (categoryId) params.push(`categoryId=${categoryId}`);
        query = '?' + params.join('&');
      }

      const res = await axios.get(`http://localhost:5000/articles${query}`);
      setArticles(res.data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  };

  const fetchJournalists = async () => {
    try {
      const res = await axios.get('http://localhost:5000/journalists');
      setJournalists(res.data);
    } catch (err) {
      console.error('Failed to fetch journalists:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // Apply filters when button clicked
  const applyFilters = () => {
    fetchArticles(selectedJournalist, selectedCategory);
  };

  // Reset filters and fetch all articles
  const resetFilters = () => {
    setSelectedJournalist('');
    setSelectedCategory('');
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

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul>
        {articles.length === 0 ? (
          <li>No articles found.</li>
        ) : (
          articles.map(article => (
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
          ))
        )}
      </ul>
    </div>
  );
}
