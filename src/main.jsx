import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Login from './Pages/Login/Login.jsx';
import SecurityLayout from './Layout/SecurityLayout.jsx';
import Register from './Pages/Register.jsx/Register.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import Home from './Pages/UserHome/Home/Home.jsx';
import PrivateRoute from './Providers/PrivateRoute.jsx';
import AdminLayout from './Layout/AdminLayout';
import AdminHome from './Pages/Admin/Home/AdminHome';
import NoticeUpdate from './Pages/Admin/NoticeUpdate/NoticeUpdate';
import PendingDue from './Pages/Admin/PendingDue/PendingDue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NoticeBoard from './Pages/UserHome/NoticeBoard/NoticeBoard';
import ManageCourse from './Pages/Admin/ManageCourse/ManageCourse';
import Classedit from './components/CourseCard/Classedit';
import Addcourses from './components/Addcourses/Addcourses';




AOS.init();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path: 'notice',
        element: <NoticeBoard></NoticeBoard>
      }
    ]
  },
  {
    path: 'adminDashboard',
    element: <PrivateRoute><AdminLayout></AdminLayout></PrivateRoute>,
    children: [
      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'manageCourses',
        element: <ManageCourse></ManageCourse>
         
      },
      {
        path: 'noticeSend',
        element: <NoticeUpdate></NoticeUpdate>
      },
      {
        path: 'pendingDue',
        element: <PendingDue></PendingDue>
      },
      {
        path: 'addcard',
        element: <Addcourses></Addcourses>
      },
      {
        path: 'update/:id',
        element:<Classedit></Classedit>,
        loader: ({ params }) => fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/update/${params.id}`)
      }
    ]
  },
  {
    path: '/',
    element: <SecurityLayout></SecurityLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
