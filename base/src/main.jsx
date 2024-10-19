import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Student from "./Student"
import Home from "./Home"
import Mentor from "./Mentor"
import MentorStu from "./MentorStu"
import Addquiz from "./Addquiz"
import QuizDisplay from "./QuizDisplay"
import EditTest from "./EditTest"
import Blogs from "./Blogs"
import Login from "./Login"
import AddPost from "./AddPost.jsx"

import { store } from "./redux/store.js"
import { Provider } from "react-redux"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/student-list" element={<Student />} />
      <Route path="/mentor-list" element={<Mentor />} />
      <Route path="/mentor-student/:id" element={<MentorStu />} />
      <Route path="/add-quiz" element={<Addquiz />} />
      <Route path="/all-quizes" element={<QuizDisplay />} />
      <Route path="/edit-test/:id" element={<EditTest />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-post" element={<AddPost />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
