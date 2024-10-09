import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Mentor = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://admin-writo.onrender.com/get-mentors');
        setData(result.data);
        setLoad(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mentor List</h1>
      {load ? (
        <div className="overflow-x-auto w-full max-w-4xl bg-white shadow-md rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Index</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Students List</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.mentor_subject}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link to={`/mentor-student/${item._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition duration-300">
                        Students
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-blue-500 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z" />
          </svg>
          <span className="text-gray-700">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Mentor;
