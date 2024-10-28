import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import img1 from "./assets/quiz.png" 
import axiosInstance from "./utils/axiosIntance"

const Test_Series = () => {
  let i = 1
  const [data, setData] = useState()
  const [load, setLoad] = useState(true)

  useEffect(() => {
    axiosInstance.get("/get-quizes")
      .then((result) => {
        setData(result.data)
        console.log(result.data)
        setLoad(false)
      })
  }, [])

  return (
    <>
      {load && <h1>Loading</h1>}

      {!load && (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10">
            {data.map((test) => (
              <div key={test._id} className="rounded overflow-hidden shadow-lg">
                <div className="relative">
                  {/* Adding the quiz image */}
                  <img
                    src={img1}
                    alt="Quiz"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[#178774] text-white px-4 py-2 rounded-full mt-3 mr-3">
                    {i++}
                  </div>
                </div>
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold mb-2">{test.test_name}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    Number of Questions: {test.questions.length}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Exam Time: {test.questions.length * 2} mins
                  </p>
                  <div className="flex justify-between">
                    <Link to={`/edit-test/${test._id}`}>
                      <button className="bg-[#178774] text-white px-4 py-2 rounded hover:bg-indigo-500">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Test_Series