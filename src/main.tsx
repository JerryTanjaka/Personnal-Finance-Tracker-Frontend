import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import LogIn from './pages/LogIn.tsx';
import App from './App.tsx';
import SignUp from './pages/SignUp.tsx';
import Categories from './pages/Categories.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" /> },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/dashboard', element: <App /> },
  { path: '/categories', element: <Categories />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
