import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PDFPreview from '../components/PDFPreview'; // Import the preview component

const Management = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewJob, setPreviewJob] = useState(null); // State to control preview

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sheet-data');
        const data = response.data;

        const completedJobs = data
          .filter((row) => row[7] === 'TRUE')
          .map((row, index) => ({
            id: index + 1,
            name: row[1],
            date: row[0],
            phone: row[2],
            address: row[3],
            email: row[4],
            info: row[5],
            price: row[6],
          }));

        setCompletedJobs(completedJobs);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data: ' + (err.response?.data?.error || err.message || 'Unknown error'));
        setLoading(false);
        console.error('Detailed error:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Management - Generate Invoices</h2>
      {completedJobs.length > 0 ? (
        completedJobs.map((job) => (
          <div key={job.id} className="mb-4 p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{job.name}</h3>
            <p>Job ID: {job.id}</p>
            <p>Date: {job.date}</p>
            <p>Phone: {job.phone}</p>
            <p>Address: {job.address}</p>
            <p>Email: {job.email}</p>
            <p>Info: {job.info}</p>
            <p>Price: {job.price}</p>
            <button
              onClick={() => setPreviewJob(job)} // Show preview
              className="mt-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Preview Invoice
            </button>
          </div>
        ))
      ) : (
        <p>No completed jobs found.</p>
      )}

      {previewJob && (
        <PDFPreview job={previewJob} onClose={() => setPreviewJob(null)} />
      )}
    </div>
  );
};

export default Management;