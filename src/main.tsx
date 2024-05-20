import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Login from './Pages/Login/Login.tsx'
import Patient_Dashboard from './Pages/Patient_Dashboard'
import Redirect from "./Pages/Redirect"
import Doctor_Dashboard from './Pages/Doctor_Dashboard'
import CreateAppointment from './VIews/Patient/CreateAppointment.tsx';
import Admin_Dashboard from './Pages/Admin_Dashboard'
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
  },
  {
    path: 'doctor/dashboard',
    element: <Doctor_Dashboard />
  },
  {
    path: 'patient/appointment',
    element: <CreateAppointment />
  },
  {
    path: 'admin/dashboard',
    element: <Admin_Dashboard />
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
   <RouterProvider router={router} />
)
