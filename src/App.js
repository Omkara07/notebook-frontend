import './App.css';
import React, { useState } from 'react'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1c1c1c";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NoteState>
            <Navbar mode={mode} toggleMode={toggleMode} />
            <Alert alert={alert} />
            <div className="container">
              <Home mode={mode} showAlert={showAlert} />
            </div>
          </NoteState>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <NoteState>
            <Navbar mode={mode} toggleMode={toggleMode} />
            <div className="container">
              <About mode={mode} />
            </div>
          </NoteState>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <NoteState>
            <Navbar mode={mode} toggleMode={toggleMode} />
            <Alert alert={alert} />
            <div className="container">
              <Login mode={mode} showAlert={showAlert} />
            </div>
          </NoteState>
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <NoteState>
            <Navbar mode={mode} toggleMode={toggleMode} />
            <Alert alert={alert} />
            <div className="container">
              <Signup mode={mode} showAlert={showAlert} />
            </div>
          </NoteState>
        </>
      ),
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
