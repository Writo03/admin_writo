import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Mentor = () => {
    let i=1
    const [data,setData]=useState();
    const [load,setLoad] = useState(false)
    useEffect(()=>{
        axios.get('https://admin-writo.onrender.com/get-mentors')
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
                <th>Subject</th>
                <th>Students list</th>
                </tr>
            </thead>
            {load ? (
            <tbody>
                    {data.map(item=>(
                    <tr key={item.id}>
                        <td>{i++}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mentor_subject}</td>
                        <td><Link to={`/mentor-student/${item._id}`}><button>students</button></Link></td>
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

export default Mentor