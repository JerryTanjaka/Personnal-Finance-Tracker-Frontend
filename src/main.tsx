import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Expense from './components/Expense/Expense';

const router = createBrowserRouter([
    {
        element: <Layout />, 
        children: [
            { path: '/', element: <Navigate to="/dashboard" /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/expense', element: <Expense /> },
        ],
    },
    { path: '/login', element: <LogIn /> },
    { path: '/signup', element: <SignUp /> },

]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
