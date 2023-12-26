import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App/App';
import Contact from './Contact/Contact';
import Article from './article/Article';
import Account from './account/Account';
import CardProduct from './CardProduct/CardProduct';
import Registration from './Entry/Registration';

const router = createBrowserRouter ([
{
  path: "/",
  element: <App />
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
  path: '/account',
  element: <Account />
},
{
  path: '/:id',
  element: <CardProduct />
},
{
  path: '/entry',
  element: <Registration />
}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
