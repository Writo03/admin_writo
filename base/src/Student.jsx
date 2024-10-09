import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Student = () => {
    let i=1
    const [data,setData]=useState();
    const [load,setLoad] = useState(false)
    useEffect(()=>{
        axios.get('https://writo-education-frontend.onrender.com/api/get-students')
        .then(result=>{
            setData(result.data)
            setLoad(true)
        })
    })
  return (
    <div>
        <table>
            <thead>
                <tr>
                <th>index</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                </tr>
            </thead>
            {load ? (
            <tbody>
                    {data.map(item=>(
                    <tr key={item.id}>
                        <td>{i++}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.student_course}</td>
                    </tr>
                    ))}
            </tbody>
            ) : (
            <p>Loading...</p>
          )}
        </table>
    </div>
  )
}

export default Student