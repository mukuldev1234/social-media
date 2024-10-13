import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import UserForm from './UserForm';
import AdminDashboard from './AdminDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "UserForm",
    element: <UserForm/>,
  },
  {
    path: "AdminDashboard",
    element: <AdminDashboard/>,
  },
  
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

