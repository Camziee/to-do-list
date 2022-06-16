import React, { useState } from 'react';

//Fetch tasks from API
//
// import { useEffect } from 'react';
// import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';

import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API
  //
  // useEffect(() => {
  //   const fetchTasks = async()  => {
  //     const { data } = await axios.get(
  //       'https://jsonplaceholder.typicode.com/todos?_limit=10'
  //     );

  //     setTasks(data);
  //   };

  //   fetchTasks();
  // }, []);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed
        }
      }

      return task;
    });

    setTasks(newTasks);
  }

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks,
      {
        id: uuidv4(),
        title: taskTitle,
        completed: false
      }
    ];

    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);

    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <>   
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
              </>
            }
          />

          <Route
            path="/:taskTitle"
            exact
            element={ <TaskDetails /> }
          />
        </Routes>

      </div>
    </Router>
  );
};

export default App;