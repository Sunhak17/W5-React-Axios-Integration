import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing article to prefill form
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setForm({
          title: response.data.title,
          content: response.data.content,
          journalistId: response.data.journalistId,
          categoryId: response.data.categoryId,
        });
      } catch (err) {
        setError('Failed to fetch article data');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/articles/${id}`, form);
      alert('Article updated successfully');
      navigate('/'); // Redirect back to articles list or wherever you want
    } catch (err) {
      alert('Failed to update article');
    }
  };

  if (loading) return <div>Loading article data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      /><br />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      /><br />
      <input
        name="journalistId"
        value={form.journalistId}
        onChange={handleChange}
        placeholder="Journalist ID"
        required
      /><br />
      <input
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        required
      /><br />
      <button type="submit">Update</button>
    </form>
  );
}
