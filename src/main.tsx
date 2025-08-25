import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LogIn from './pages/LogIn.tsx';
import SignUp from './pages/SignUp.tsx';

const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <LogIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/dashboard', element: <App /> },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
