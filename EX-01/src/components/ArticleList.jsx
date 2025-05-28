import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete article');
      alert('Article deleted successfully');
      fetchArticles(); // Refresh list after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.length === 0 && <li>No articles available.</li>}
        {articles.map(article => (
          <li key={article.id} style={{ marginBottom: '15px' }}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>{' '}
            <button onClick={() => navigate(`/articles/update/${article.id}`)}>Update</button>{' '}
            <button onClick={() => navigate(`/articles/${article.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
