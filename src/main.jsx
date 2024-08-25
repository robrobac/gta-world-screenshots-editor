import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './pages/homePage/HomePage';
import ParserPage from './pages/newPage/ParserPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/parser",
    element: <ParserPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
