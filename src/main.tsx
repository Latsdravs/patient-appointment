import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Login from './Pages/Login/Login.tsx'
import Patient_Dashboard from './Pages/Patient_Dashboard'
import Redirect from "./Pages/Redirect"
const router = createBrowserRouter([
  {
    path:"patient/login",
    element:<Login redirect={0} />
  },
  {
    path:"doctor/login",
    element:<Login redirect={1} />
  },
  {
    path:"admin/login",
    element:<Login redirect={2} />
  },
  {
    path:"patient/dashboard",
    element: <Patient_Dashboard />
  },
  {
    path: "/",
    element: <Redirect />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
   <RouterProvider router={router} />
)
