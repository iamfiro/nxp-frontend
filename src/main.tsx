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
// @ts-ignore
import PageNoMatch from "./pages/noMatch.tsx";
import PagePasswordRecovery from "./pages/passwordRecovery.tsx";
import Setting from "./pages/setting.tsx";
import PageUserProfile from "./pages/userProfile.tsx";
import Logout from "./pages/Logout.tsx";
import PrivacyPolicy from "./pages/Privacy.tsx";

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
	{
		path: '/password_reset/:token',
		element: <PagePasswordRecovery />
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
	// User
	{
		path: '/user/:id',
		element: <PageUserProfile />
	},
	{
		path: '/setting',
		element: <Setting />
	},
	// Logout
	{
		path: '/logout',
		element: <Logout />,
	},
	// Docs
	{
		path: '/privacy',
		element: <PrivacyPolicy />
	},
	// 404
	{
		path: '*',
		element: <PageNoMatch />
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<ToastContainer />
	</React.StrictMode>,
)
