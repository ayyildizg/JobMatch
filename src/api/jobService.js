const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "JobMatch",
    location: "İstanbul",
    salary: "₺15,000 - ₺20,000",
    skills: ["React", "JavaScript", "HTML/CSS"],
    status: "pending"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "TechCorp",
    location: "St.Petersburg",
    salary: "₺18,000 - ₺25,000",
    skills: ["Node.js", "Python", "SQL"],
    status: "completed"
  }
];

export const fetchJobs = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockJobs), 500);
  });
};

export const fetchJobById = (id) => {
  return new Promise((resolve, reject) => {
    const job = mockJobs.find(job => job.id === id);
    if (job) resolve(job);
    else reject(new Error("İş bulunamadı"));
  });
};

export const addJob = (newJob) => {
  return new Promise((resolve) => {
    mockJobs.push({ ...newJob, id: mockJobs.length + 1 });
    setTimeout(() => resolve("İş eklendi!"), 300);
  });
};
