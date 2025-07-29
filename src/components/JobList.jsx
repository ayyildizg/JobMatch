import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';

const JobList = () => {
  const {
    jobs,
    deleteJob,
    filteredJobs, // filterJobs yerine filteredJobs kullanıyoruz
    totalJobs,
    pendingJobs
  } = useContext(JobContext);

  // Filtreleme state'i
  const [filter, setFilter] = useState('all');

  // Context'ten gelen filteredJobs'u kullanıyoruz
  const displayJobs = filter === 'all'
    ? filteredJobs
    : filteredJobs.filter(job => job.status === filter);

  return (
    <div className="job-list">
      <div className="stats">
        <span>Toplam İlan: {totalJobs}</span>
        <span>Bekleyenler: {pendingJobs}</span>
      </div>

      <div className="filter-section">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tüm İlanlar</option>
          <option value="pending">Bekleyenler</option>
          <option value="completed">Tamamlananlar</option>
        </select>
      </div>

      <div className="jobs-container">
        {displayJobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Şirket:</strong> {job.company}</p>
            <p><strong>Lokasyon:</strong> {job.location}</p>
            <p><strong>Maaş:</strong> {job.salary}</p>
            <p><strong>Durum:</strong>
              <span className={`status-${job.status}`}>
                {job.status === 'pending' ? 'Beklemede' : 'Tamamlandı'}
              </span>
            </p>
            <button
              onClick={() => deleteJob(job.id)}
              className="delete-btn"
            >
              İlanı Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;