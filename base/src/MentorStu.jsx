import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MentorStu = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://admin-writo.onrender.com/mentor-student/${id}`);
                setData(result.data);
                setLoad(true);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load student data.');
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Students of Mentor ID: {id}</h1>
            {load ? (
                <div className="overflow-x-auto w-full max-w-4xl bg-white shadow-md rounded-lg">
                    {data.length > 0 ? (
                        <table className="min-w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border-b">Index</th>
                                    <th className="py-2 px-4 border-b">Student Name</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((student, index) => (
                                    <tr key={student._id} className="hover:bg-gray-100 transition duration-200">
                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">{student.name}</td>
                                        <td className="py-2 px-4 border-b">{student.email}</td>
                                        <td className="py-2 px-4 border-b">{student.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600 text-center p-4">No students found for this mentor.</p>
                    )}
                </div>
            ) : error ? (
                <p className="text-red-600">{error}</p>
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

export default MentorStu;
