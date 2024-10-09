import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Student from './Student';
import Home from './Home';
import Mentor from './Mentor';
import MentorStu from './MentorStu';
import Addquiz from './Addquiz';
import QuizDisplay from './QuizDisplay';
import EditTest from './EditTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/student-list'  element={<Student/>}/>
        <Route path='/mentor-list' element={<Mentor/>}/>
        <Route path='/mentor-student/:id' element={<MentorStu/>}/>
        <Route path='/add-quiz' element={<Addquiz/>}/>
        <Route path='/all-quizes' element={<QuizDisplay/>}/>
        <Route path='/edit-test/:id' element={<EditTest/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;