import {BrowserRouter as Router, Routes, Route} from "react-router";
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TaskDetail from './TaskDetail/TaskDetail';
import TaskListContainer from './TaskListContainer/TaskListContainer';
import About from './About/About.js';
import { initTasks } from "./Redux/taskAction.js";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  let authorName = "Corentin";
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(initTasks());
  },[dispatch]);

  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<TaskListContainer/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/taskDetail/:id" element={ <TaskDetail/> }/>
        </Routes>
        <Footer name={authorName} />
      </div>
    </Router>
  );
}

export default App;
