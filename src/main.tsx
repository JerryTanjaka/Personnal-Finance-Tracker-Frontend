import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import LogIn from "./pages/LogIn.tsx";

const router = createBrowserRouter([
    { path: '/', element: <LogIn/>},
    { path: '/dashboard', element: <App/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
