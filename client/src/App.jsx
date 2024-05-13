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
import InfoOrder from './account/Order/InfoOrder';
import Search from './Cards/Search';
import Pharm from './acoountPharm/Pharm';
import PharmOrder from './acoountPharm/order/PharmOrder';
import ChangeAccount from './account/ChangeAccount';

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
        path: '/search',
        element: <Search />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      },
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
        path: '/search',
        element: <Search />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/order/:id',
        element: <InfoOrder />
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
        path: '/changeAccount',
        element: <ChangeAccount />
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
      {
        path: '/',
        element: <Pharm />
      },
      {
        path: '/PharmOrder/:pharmId/:orderId',
        element: <PharmOrder />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  }
])

// const authRouterAdmin = createBrowserRouter([
//   {
//     path: '/',
//     element: <Outlet />,
//     children: [
//       {
//         path: '/addNewProduct',
//         element: <AddProduct />
//       },
//       {
//         path: '*',
//         element: <Navigate to="/addNewProduct" />
//       }
//     ]
//   }
// ])

function App() {
  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.roleid)
  const id = useSelector((state) => state.auth.id)

  console.log({ token, role, id })

  return (
    token ?
        role == 1 ?
        <RouterProvider router={authRouter} /> :
        <RouterProvider router={authRouterPharm} /> :
    <RouterProvider router={router} />

  )
}

export default App
