import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';

function App() {
  return (
    <JobProvider>
      <Router>
        <nav className="navbar">
          <Link to="/" className="nav-link">Домашняя Страница</Link>
          <Link to="/add-job" className="nav-link">добавь работу</Link>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
          </Routes>
        </main>
      </Router>
    </JobProvider>
  );
}

export default App;
