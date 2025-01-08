import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Management = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Google Sheets
        const response = await axios.get('http://localhost:5000/api/sheet-data');
        const data = response.data;

        // Filter rows where the "Completed" column (index 7) is 'TRUE'
        const completedJobs = data
          .filter((row) => row[7] === 'TRUE') // Only include rows where the 8th column is 'TRUE'
          .map((row, index) => ({
            id: index + 1, // Use row index as ID (or use a unique column from the sheet)
            name: row[1], // Name from the sheet (assuming index 1 is the name column)
            date: row[0], // Date from the sheet (assuming index 0 is the date column)
            phone: row[2], // Phone from the sheet (assuming index 2 is the phone column)
            address: row[3], // Address from the sheet (assuming index 3 is the address column)
            email: row[4], // Email from the sheet (assuming index 4 is the email column)
            info: row[5], // Info from the sheet (assuming index 5 is the info column)
            price: row[6], // Price from the sheet (assuming index 6 is the price column)
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

  const generatePDF = (job) => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${job.name}`, 10, 10);
    // Add more details to the PDF as needed
    doc.save(`invoice_${job.id}.pdf`);
  };

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
              onClick={() => generatePDF(job)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Invoice
            </button>
          </div>
        ))
      ) : (
        <p>No completed jobs found.</p>
      )}
    </div>
  );
};

export default Management;