import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import './styles/global.scss';

import PageHome from "./pages/home.tsx";
import PageLogin from "./pages/login.tsx";
import PageRegister from "./pages/register.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import PageRank from "./pages/rank.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageHome />
    },
	{
		path: '/login',
		element: <PageLogin />
	},
	{
		path: '/register',
		element: <PageRegister />
	},
	{
		path: '/rank',
		element: <PageRank />
	},
	{
		path: '/problem',
		element: <Navigate replace to={'/'} />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <RouterProvider router={router} />
		  <ToastContainer />
      </React.StrictMode>,
)
