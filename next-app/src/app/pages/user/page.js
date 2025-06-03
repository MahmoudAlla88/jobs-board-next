// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function DesignPage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         const res = await axios.get('/api/jobs');
//         setJobs(res.data);
//       } catch (err) {
//         setError('Failed to load jobs');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchJobs();
//   }, []);

//   if (loading) return <p>Loading design jobs...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f5', padding: '2rem' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Jobs – Design Focus</h1>
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//         {jobs.map((job) => (
//           <div key={job.id} style={{ background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
//             <h2 style={{ color: '#333' }}>{job.title}</h2>
//             <p><strong>Location:</strong> {job.location}</p>
//             <p style={{ fontStyle: 'italic' }}>{job.description}</p>
//             <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <p className="text-purple-700 text-lg font-semibold animate-pulse">Loading design jobs...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <p className="text-red-600 font-semibold">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-12 px-6">
      <h1 className="text-center text-4xl font-extrabold mb-12 text-purple-800 drop-shadow-lg">
        Jobs 
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            title={job.title}
          >
            <h2 className="text-2xl font-bold text-purple-900 mb-3">{job.title}</h2>
            <p className="text-purple-700 font-semibold mb-1">
              <span className="inline-block mr-2 font-normal text-gray-600">Location:</span> {job.location}
            </p>
            <p className="text-gray-700 italic mb-4 leading-relaxed">{job.description}</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-purple-800">Deadline:</span>{' '}
              {new Date(job.deadline).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
