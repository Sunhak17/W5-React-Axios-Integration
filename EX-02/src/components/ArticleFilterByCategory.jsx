import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all articles and categories on mount
  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // Fetch all articles or filtered articles if category selected
  const fetchArticles = async (categoryId = '') => {
    try {
      let url = 'http://localhost:5000/articles';
      if (categoryId) {
        // Assuming your API supports query param ?categoryId=...
        url += `?categoryId=${categoryId}`;
      }
      const res = await axios.get(url);
      setArticles(res.data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // Handle filter apply
  const applyFilters = () => {
    fetchArticles(selectedCategory);
  };

  // Reset filters to show all articles
  const resetFilters = () => {
    setSelectedCategory('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
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
          articles.map((article) => (
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
