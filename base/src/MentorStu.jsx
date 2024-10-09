import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MentorStu = () => {
    const {id} = useParams()
    const [data,setData] = useState()
    const [load,setLoad] = useState(false)
    useEffect(()=>{
        axios.get(`https://writo-education-frontend.onrender.com/mentor-student/${id}`)
        .then(result=>{
            setData(result.data)
            setLoad(true)
        })
    },[id])
  return (
    <div>MentorStu
        
    </div>
  )
}

export default MentorStu