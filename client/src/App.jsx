import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import './index.css'
import Contact from './Contact/Contact';
import Article from './article/Article';
import Account from './account/Account';
import CardProduct from './CardProduct/CardProduct';
import Basket from './Basket/Basket';
import MainApp from './MainApp/MainApp';
import Auth from './Entry/Auth';
import Reg from './Entry/Registration';
import CardCat from './Cards/CardCat';
import AddProduct from './AddProduct/AddProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <MainApp />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: '/article',
        element: <Article />
      },
      {
        path: '/product/:productId',
        element: <CardProduct />
      },
      {
        path: 'category/:categoryId',
        element: <CardCat />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/reg',
        element: <Reg />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      },
      // {
      //   path: '/basket',
      //   element: <Basket />
      // },
    ]
  }
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <MainApp />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/basket',
        element: <Basket />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: '/article',
        element: <Article />
      },
      {
        path: '/product/:productId',
        element: <CardProduct />
      },
      {
        path: 'category/:categoryId',
        element: <CardCat />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/reg',
        element: <Reg />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }
    ]
  }
])

const authRouterPharm = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
    ]
  }
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/addNewProduct',
        element: <AddProduct />
      },
      {
        path: '*',
        element: <Navigate to="/addNewProduct" />
      }
    ]
  }
])

function App() {
  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.roleid)
  const id = useSelector((state) => state.auth.id)

  console.log({ token, role, id })

  return (
    token ?
    role == 3 ?
        <RouterProvider router={authRouterAdmin} /> :
        role == 1 ?
        <RouterProvider router={authRouter} /> :
        <RouterProvider router={authRouterPharm} /> :
    <RouterProvider router={router} />

  )
}

export default App
