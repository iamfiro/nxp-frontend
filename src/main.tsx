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
import PageProblem from "./pages/problem.tsx";
import PagePasswordRecoveryRequest from "./pages/passwordRecoveryRequest.tsx";
import PageNoMatch from "./pages/noMatch.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageHome />
    },
	// Auth
	{
		path: '/login',
		element: <PageLogin />
	},
	{
		path: '/register',
		element: <PageRegister />
	},
	{
		path: '/password_reset',
		element: <PagePasswordRecoveryRequest />
	},
	// Rank
	{
		path: '/rank',
		element: <PageRank />
	},
	// Problem
	{
		path: '/problem',
		element: <Navigate replace to={'/'} />
	},
	{
		path: '/problem/:id',
		element: <PageProblem />
	},
	// 404
	{
		path: '*',
		element: <PageNoMatch />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <RouterProvider router={router} />
		  <ToastContainer />
      </React.StrictMode>,
)
