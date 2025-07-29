import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase"; // analytics kullanılmadığı için kaldırıldı

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [loading, setLoading] = useState(true);

  // Firestore'dan veri çekme
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsData);
      setLoading(false);

      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    });
    return () => unsubscribe();
  }, []);

  // Favorileri kaydetme
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filtrelenmiş işler
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesSalary = job.salary >= salaryRange[0] && job.salary <= salaryRange[1];
      return matchesSearch && matchesStatus && matchesSalary;
    });
  }, [jobs, searchTerm, statusFilter, salaryRange]);

  // Analitik veriler
  const jobAnalytics = useMemo(() => ({
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.status === 'active').length,
    closedJobs: jobs.filter(job => job.status === 'closed').length,
    totalApplicants: jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0)
  }), [jobs]);

  // CRUD Operasyonları
  const addJob = useCallback(async (newJob) => {
    const docRef = await addDoc(collection(db, "jobs"), {
      ...newJob,
      postedDate: new Date().toISOString(),
      status: newJob.status || "pending",
      applicants: []
    });
    return { id: docRef.id, ...newJob };
  }, []);

  const updateJob = useCallback(async (id, updatedData) => {
    await updateDoc(doc(db, "jobs", id), updatedData);
  }, []);

  const deleteJob = useCallback(async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    setFavorites(prev => prev.filter(favId => favId !== id));
  }, []);

  // Context değeri
  const contextValue = useMemo(() => ({
    jobs,
    favorites,
    filteredJobs,
    analytics: jobAnalytics,
    loading,
    searchTerm,
    statusFilter,
    salaryRange,
    setSearchTerm,
    setStatusFilter,
    setSalaryRange,
    addJob,
    updateJob,
    deleteJob,
    addFavorite: (jobId) => !favorites.includes(jobId) && setFavorites(prev => [...prev, jobId]),
    removeFavorite: (jobId) => setFavorites(prev => prev.filter(id => id !== jobId)),
    toggleFavorite: (id) =>
      setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]),
    getJobById: (id) => jobs.find(job => job.id === id),
    isFavorite: (id) => favorites.includes(id)
  }), [
    jobs, favorites, filteredJobs, jobAnalytics, loading,
    searchTerm, statusFilter, salaryRange, addJob,
    updateJob, deleteJob
  ]);

  return (
    <JobContext.Provider value={contextValue}>
      {children}
    </JobContext.Provider>
  );
};