import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ArticleViewer() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) return <div>Loading article...</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <p><strong>Journalist ID:</strong> {article.journalistId}</p>
      <p><strong>Category ID:</strong> {article.categoryId}</p>
      <Link to={`/update/${id}`}>Edit Article</Link> | <Link to="/">Back to List</Link>
    </div>
  );
}

export default ArticleViewer;
