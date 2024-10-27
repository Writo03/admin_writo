import "./App.css"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { signIn } from "./redux/userSlice/userSlice"
import axiosInstance from "./utils/axiosIntance"

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("/check-login")
        if (res.data) {
          dispatch(signIn(res.data.data))
        } else {
          navigate("/login")
        }
      } catch (error) {
        navigate("/login")
      }
    }
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Outlet />
  )
}

export default App
