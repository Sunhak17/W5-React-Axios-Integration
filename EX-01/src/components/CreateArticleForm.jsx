import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function ArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

    if (!form.title.trim() || !form.content.trim() || !form.journalistId.trim() || !form.categoryId.trim()) {
      alert("All fields are required.");
      return;
    }

    // Optionally, validate numeric fields if needed
    if (isNaN(Number(form.journalistId)) || isNaN(Number(form.categoryId))) {
      alert("Journalist ID and Category ID must be numbers.");
      return;
    }

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Failed to add article');
      }
      alert("Article added successfully!");
      setForm({ title: '', content: '', journalistId: '', categoryId: '' }); // reset form
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
      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
        <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
        <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
        <button type="submit">Add</button>
      </form>

    </div>
  );
}
