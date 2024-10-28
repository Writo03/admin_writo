import "./App.css"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { signIn } from "./redux/userSlice/userSlice"
import axiosInstance from "./utils/axiosIntance"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true)
      try {
        const res = await axiosInstance.get("/check-login")
        if (res.data) {
          dispatch(signIn(res.data.data))
        } else {
          navigate("/login")
        }
      } catch (error) {
        navigate("/login")
      }finally{
        setIsLoading(false)
      }
    }
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if(isLoading){
    return (
      <div className="h-screen flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 text-blue-500 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z" />
          </svg>
      </div>
    )
  }

  return (
    <Outlet />
  )
}

export default App
