import { useEffect, useState } from 'react';
import Loader from "./Loader"
import {useSelector} from "react-redux"
import axiosInstance from "../utils/axiosIntance.js"
import {useNavigate} from "react-router-dom"

const DoubtReq = () => {
    const user = useSelector(state => state.user.userData)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getRequests = async () => {
        setIsLoading(true)
        try {
            const res = await axiosInstance.get("/get-doubts")
            // console.log(res)
            setRequests(res.data.requests)
            setError({
                isError : false,
                message : ""
            })
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setError({
                isError : true,
                message : error.response.data
            })
            setIsLoading(false)
        }
    }
    if(!user.isAdmin && !user.mentor_access?.includes("CONTACT")){
        navigate("/")
      }else {
        getRequests()
      }
  }, [user, navigate])


  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (error.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-red-800 font-medium text-lg">Error</h3>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Doubtsection Requests</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and review Doubtsection requests from users
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">No contact requests found</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{request.user.email}</div>
                        <div className="text-sm text-gray-500">{request.user.phoneNo}</div>
                      </td>
                      <td className="px-6 py-4">
                        {/* <div className="text-sm text-gray-900 max-w-md truncate">
                          {request.message}
                        </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtReq;