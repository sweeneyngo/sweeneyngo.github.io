import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App.tsx'
import Alias from "./views/Alias.tsx";
import FAQ from './views/FAQ.tsx';
import NotFound from './views/NotFound.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: "/alias",
    element: <Alias />
  },
  {
    path: "/faq",
    element: <FAQ />
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
