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
        element: <PrivateRoute><NoticeBoard></NoticeBoard></PrivateRoute>
      },
      {
        path: 'resources',
        element: <PrivateRoute><Resources/></PrivateRoute>
      },
      {
        path: 'classes',
        element: <PrivateRoute><ClassRoutine></ClassRoutine></PrivateRoute>
      },
      {
        path: 'cardre',
        element: <PrivateRoute><Report/></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute> <MyProfile></MyProfile></PrivateRoute>
      },
      {
        path:'edit/:id',
        element: <PrivateRoute><Editprofilr></Editprofilr></PrivateRoute>,
        loader: ({params}) =>fetch(`  https://asteriactg.com/edit/${params.id}`)
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
        path: 'techerlist',
        element: <Teacher></Teacher>
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
        path: 'addincome',
        element: <Addincome/>
      },
      {
        
          path: 'techeratt',
          element: <Teacherattandance/>
        
      },
      {
        path: 'addatt',
        element: <Addatt></Addatt>
      },
      {
        path:'attendance/:id',
        element:<AttendanceHistory></AttendanceHistory>,
        loader: ({params}) =>fetch(`   https://asteriactg.com/adminDashboard/attendance/${params.id}`)
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
        path: 'brithday',
        element:<Brithdayremainder></Brithdayremainder>
      },
      {
        path: 'exam',
        element:<ExamList/>
      },
      {
        path:'sendmessage/:id',
        element:<Exam></Exam>,
        loader: ({params}) =>fetch(`  https://asteriactg.com/adminDashboard/sendmessage/${params.id}`)
   },
      {
        path:'pay/:id',
        element:<PayDetails></PayDetails>,
        loader: ({params}) =>fetch(` https://asteriactg.com/adminDashboard/pay/${params.id}`)
   },
      {
        path:'stupay/:id',
        element:<PayDetalisStu></PayDetalisStu>,
        loader: ({params}) =>fetch(`  https://asteriactg.com/adminDashboard/stupay/${params.id}`)
   },
      {
        path: 'update/:id',
        element:<Classedit></Classedit>,
        loader: ({ params }) => fetch(` https://asteriactg.com/adminDashboard/update/${params.id}`)
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
import Brithdayremainder from './components/Brithday/Brithdayremainder';
import Exam from './Pages/Admin/Exam/Exam';
import ExamList from './Pages/Admin/Exam/ExamList';
import Addincome from './Pages/Admin/Income&ExpenseGraph/Addincome';
import Resources from './Pages/UserHome/Resources/Resources';
import AttendanceHistory from './Pages/Admin/Attandance/AbttendanceHistory ';
import Report from './Pages/UserHome/Report/Report';
import Teacherattandance from './Pages/Admin/Payment/Teacherattandance';
import Teacher from './Pages/Admin/TeacherForm/Teacher.jsx';
import Editprofilr from './Pages/UserHome/MyProfile/Editprofilr.jsx';


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
