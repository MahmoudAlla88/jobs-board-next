// 'use client'
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function AdminDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [form, setForm] = useState({ title: '', location: '', description: '', deadline: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   async function fetchJobs() {
//     try {
//       const res = await axios.get('/api/jobs');
//       setJobs(res.data);
//     } catch (err) {
//       setError('Failed to fetch jobs');
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const payload = { ...form };
//     try {
//       if (editingId) {
//         await axios.put(`/api/jobs/${editingId}`, payload);
//       } else {
//         await axios.post('/api/jobs', payload);
//       }
//       setForm({ title: '', location: '', description: '', deadline: '' });
//       setEditingId(null);
//       fetchJobs();
//     } catch (err) {
//       alert('Error saving job');
//     }
//   }

//   function handleEdit(job) {
//     setEditingId(job.id);
//     setForm({
//       title: job.title,
//       location: job.location,
//       description: job.description,
//       deadline: new Date(job.deadline).toISOString().substr(0, 10),
//     });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   async function handleDelete(id) {
//     if (!confirm('Are you sure you want to delete this job?')) return;
//     try {
//       await axios.delete(`/api/jobs/${id}`);
//       fetchJobs();
//     } catch {
//       alert('Error deleting job');
//     }
//   }

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
//       <h1>Admin Dashboard</h1>

//       {/* Form for Create / Edit */}
//       <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
//         <div>
//           <label>Title:</label><br />
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <div>
//           <label>Location:</label><br />
//           <input
//             type="text"
//             name="location"
//             value={form.location}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <div>
//           <label>Description:</label><br />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//             rows={4}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <div>
//           <label>Deadline:</label><br />
//           <input
//             type="date"
//             name="deadline"
//             value={form.deadline}
//             onChange={handleChange}
//             required
//             style={{ padding: '0.5rem', marginBottom: '0.5rem' }}
//           />
//         </div>
//         <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>
//           {editingId ? 'Update Job' : 'Add Job'}
//         </button>
//       </form>

//       {/* List of Jobs */}
//       {loading && <p>Loading jobs...</p>}
//       {error && <p>{error}</p>}
//       {!loading && !error && (
//         <div>
//           {jobs.length === 0 && <p>No jobs found.</p>}
//           {jobs.map((job) => (
//             <div key={job.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
//               <h2>{job.title}</h2>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p>{job.description}</p>
//               <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
//               <button onClick={() => handleEdit(job)} style={{ marginRight: '1rem' }}>Edit</button>
//               <button onClick={() => handleDelete(job.id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client'
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, MapPin, Building, Save, X, Search, Filter, BarChart3, Users, Briefcase, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', location: '', description: '', deadline: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
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
        await fetch(`/api/jobs/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setForm({ title: '', location: '', description: '', deadline: '' });
      setEditingId(null);
      setShowForm(false);
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
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await fetch(`/api/jobs/${id}`, {
        method: 'DELETE'
      });
      fetchJobs();
    } catch {
      alert('Error deleting job');
    }
  }

  function handleCancel() {
    setForm({ title: '', location: '', description: '', deadline: '' });
    setEditingId(null);
    setShowForm(false);
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeJobs = jobs.filter(job => {
    const today = new Date();
    const deadline = new Date(job.deadline);
    return deadline >= today;
  }).length;
  
  const expiredJobs = jobs.filter(job => {
    const today = new Date();
    const deadline = new Date(job.deadline);
    return deadline < today;
  }).length;

  const isJobExpired = (deadline) => {
    const today = new Date();
    const jobDeadline = new Date(deadline);
    return jobDeadline < today;
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-96">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <LoadingSpinner />
        <p className="text-center text-xl text-gray-600 mt-6">Loading admin dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-60 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" />
        <div className="absolute bottom-20 right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Manage your job postings and track applications</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              {showForm ? 'Hide Form' : 'Add New Job'}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
                  <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
                  <p className="text-3xl font-bold text-green-600">{activeJobs}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Expired Jobs</p>
                  <p className="text-3xl font-bold text-red-600">{expiredJobs}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {jobs.length > 0 ? Math.round((activeJobs / jobs.length) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Job' : 'Add New Job'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    placeholder="Enter job title..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Enter location..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                  placeholder="Enter job description..."
                />
              </div>

              <div className="md:w-1/2">
                <label className="block text-gray-700 font-semibold mb-2">Application Deadline</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingId ? 'Update Job' : 'Add Job'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>
            <div className="text-gray-600 font-medium">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first job posting'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200"
                >
                  Add Your First Job
                </button>
              )}
            </div>
          )}

          {filteredJobs.map((job) => {
            const expired = isJobExpired(job.deadline);
            return (
              <div
                key={job.id}
                className={`group bg-white/40 backdrop-blur-md rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] shadow-lg ${
                  expired 
                    ? 'border-red-200 bg-red-50/40' 
                    : 'border-white/30 hover:bg-white/50'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mr-4 ${
                      expired 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
                    }`}>
                      <Building className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-1 ${
                        expired ? 'text-red-700' : 'text-gray-800'
                      }`}>
                        {job.title}
                      </h2>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                        {expired && (
                          <span className="ml-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                            Expired
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-200 hover:scale-110"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200 hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${
                    expired ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {expired ? 'Applications Closed' : 'Accepting Applications'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}