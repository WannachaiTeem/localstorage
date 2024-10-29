// import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login';
import HomePage from './pages/home';
// import FristPage from './pages/Fristpage';

const routers = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  // { path: "/home", element: <HomePage /> },
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={routers} />
    </>
  )
}

export default App


