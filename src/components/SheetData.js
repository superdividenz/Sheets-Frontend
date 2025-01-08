import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SheetData = () => {
  const [data, setData] = useState([]); // State to store sheet data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Function to generate Google Maps link
  const getGoogleMapsLink = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sheet-data');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sheet data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle the click on the Completed column
  const handleComplete = async (index) => {
    try {
      // Update Google Sheets
      await axios.put(`http://localhost:5000/api/update-row/${index + 1}`, {
        completed: 'TRUE', // Send the new completed status
      });

      // Update local state to reflect the change
      const updatedData = [...data];
      updatedData[index][7] = 'TRUE'; // Update the 8th column (Completed) to 'TRUE'
      setData(updatedData);
    } catch (error) {
      console.error('Error updating row:', error);
      // Optionally, you might want to inform the user if the backend update failed
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Display sheet data in a table
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sealing 2025</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Info</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Completed</th> {/* New column for checkmark */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-200">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-6 py-4 text-gray-700 ${
                      i === 7 ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => i === 7 && handleComplete(index)} // Make only the 8th column clickable
                  >
                    {i === 7 ? ( // Checkmark in the 8th column (index 7)
                      cell === 'TRUE' ? (
                        <span className="text-black-600">✓</span> // Display a checkmark if TRUE
                      ) : (
                        <span className="text-gray-400">Click to complete</span> // Placeholder text
                      )
                    ) : i === 3 ? ( // Address column (index 3)
                      <a
                        href={getGoogleMapsLink(cell)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-100 text-black-800 rounded-lg hover:bg-blue-200 transition duration-200"
                        title="View on Google Maps" // Tooltip
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {cell}
                      </a>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SheetData;