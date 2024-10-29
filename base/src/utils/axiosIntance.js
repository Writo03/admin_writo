import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
  // baseURL: "https://admin-writo.onrender.com",
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance