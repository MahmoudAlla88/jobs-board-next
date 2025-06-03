'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', location: '', description: '', deadline: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form };
    try {
      if (editingId) {
        await axios.put(`/api/jobs/${editingId}`, payload);
      } else {
        await axios.post('/api/jobs', payload);
      }
      setForm({ title: '', location: '', description: '', deadline: '' });
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      alert('Error saving job');
    }
  }

  function handleEdit(job) {
    setEditingId(job.id);
    setForm({
      title: job.title,
      location: job.location,
      description: job.description,
      deadline: new Date(job.deadline).toISOString().substr(0, 10),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await axios.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch {
      alert('Error deleting job');
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>Admin Dashboard</h1>

      {/* Form for Create / Edit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label>Location:</label><br />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label>Deadline:</label><br />
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>
          {editingId ? 'Update Job' : 'Add Job'}
        </button>
      </form>

      {/* List of Jobs */}
      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          {jobs.length === 0 && <p>No jobs found.</p>}
          {jobs.map((job) => (
            <div key={job.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h2>{job.title}</h2>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>
              <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
              <button onClick={() => handleEdit(job)} style={{ marginRight: '1rem' }}>Edit</button>
              <button onClick={() => handleDelete(job.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}