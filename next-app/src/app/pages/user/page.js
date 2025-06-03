'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DesignPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get('/api/jobs');
        setJobs(res.data);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) return <p>Loading design jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f5', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Jobs – Design Focus</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {jobs.map((job) => (
          <div key={job.id} style={{ background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333' }}>{job.title}</h2>
            <p><strong>Location:</strong> {job.location}</p>
            <p style={{ fontStyle: 'italic' }}>{job.description}</p>
            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}