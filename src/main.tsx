import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './styles/global.scss';

import PageHome from "./pages/home.tsx";
import PageLogin from "./pages/login.tsx";
import PageRegister from "./pages/register.tsx";
import 'react-toastify/dist/ReactToastify.css';

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
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>,
)
