import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PageHome from "./pages/home.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageHome />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>,
)
