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
import ManageUsers from './Pages/Admin/ManageUsers/ManageUsers';




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
      },
      {
        path: 'classes',
        element: <ClassRoutine></ClassRoutine>
      },
      {
        path: 'profile',
        element: <MyProfile></MyProfile>
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
        path: 'addexpress',
        element: <AddExpress></AddExpress>
      },
      {
        path: 'manageCourses',
        element: <ManageCourse></ManageCourse>
         
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
         
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
        path: 'resourcesupload',
        element: <Resouresc></Resouresc>
      },
      {
        path: 'addcard',
        element: <Addcourses></Addcourses>
      },
      {
        path: 'adduser',
        element: <AddUsers></AddUsers>
      },
      {
        path: 'addstu',
        element: <StudentFrom></StudentFrom>
      },
      {
        path: 'addPayment',
        element: <PaymentStu></PaymentStu>
      },
      {
        path: 'att',
        element: <Attandace></Attandace>
      },
      {
        path: 'addatt',
        element: <Addatt></Addatt>
      },
      {
        path: 'batch',
        element:<BatchCls></BatchCls>
      },
      {
        path: 'homework',
        element:<Homework/>
      },
      {
        path: 'homeworklist',
        element:<Homeworklist/>
      },
      {
        path: 'teacherpay',
        element:<Teacherpay></Teacherpay>
      },
      {
        path:'pay/:id',
        element:<PayDetails></PayDetails>,
        loader: ({params}) =>fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/pay/${params.id}`)
   },
      {
        path:'stupay/:id',
        element:<PayDetalisStu></PayDetalisStu>,
        loader: ({params}) =>fetch(` https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/stupay/${params.id}`)
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
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AddUsers from './components/AddUsers/AddUsers';

import StudentFrom from './Pages/Admin/StudentFrom/StudentFrom';

import ClassRoutine from './Pages/UserHome/ClassRoutine/ClassRoutine';
import MyProfile from './Pages/UserHome/MyProfile/MyProfile';
import Attandace from './Pages/Admin/Attandance/Attandace';
import BatchCls from './Pages/Admin/BatchCls/BatchCls';
import Addatt from './Pages/Admin/Attandance/Addatt';
import Teacherpay from './Pages/Admin/Payment/Teacherpay';
import PayDetails from './Pages/Admin/Payment/PayDetails';
import AddExpress from './Pages/Admin/ExpenseGraph/AddExpress';
import PaymentStu from './Pages/Admin/StudentFrom/PaymentStu';
import PayDetalisStu from './Pages/Admin/StudentFrom/PayDetalisStu';
import Resouresc from './Pages/Admin/Resources/Resouresc';
import Homework from './Pages/Admin/Home-Work/Homework';
import Homeworklist from './Pages/Admin/Home-Work/Homeworklist';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
