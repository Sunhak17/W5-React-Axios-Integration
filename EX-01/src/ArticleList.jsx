import axios from 'axios';
import { Link } from 'react-router-dom';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
