'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import "../globals.css";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      const res = await axios.get(`http://localhost:5000/api/notes?page=${page}&limit=5&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Error fetching notes');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/notes/${editId}`, { title, content }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/notes', { title, content }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setTitle('');
      setContent('');
      setEditId(null);
      fetchNotes();
    } catch (err) {
      setError('Error saving note');
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      setError('Error deleting note');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Note</button>
      </form>
      
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <ul className="note-list">
        {notes.map(note => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(note._id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
      
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
