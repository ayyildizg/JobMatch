import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../api/jobService';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobById(Number(id))
      .then(data => setJob(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!job) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p><strong>Şirket:</strong> {job.company}</p>
      <p><strong>Beceriler:</strong> {job.skills.join(', ')}</p>
      <p><strong>Durum:</strong> {job.status}</p>
    </div>
  );
};

export default JobDetail;