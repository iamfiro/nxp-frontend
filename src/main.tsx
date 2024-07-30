import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './styles/global.scss';

import PageHome from "./pages/home.tsx";
ㅈimport PageLogin from "./pages/login.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageHome />
    },
	{
		path: '/login',
		element: <PageLogin />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>,
)
