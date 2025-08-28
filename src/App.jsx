import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Categories from "./components/Cattegories/Categories";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import CounterContextProvider from "./Context/CounterContext";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute/AuthProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCounContextProvider from "./Context/CartCountContext";
import WichList from "./components/WichList/WichList";
import Details from "./components/Details/Details";
import AllOrder from "./components/AllOrder/AllOrder";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ResetCode from "./components/ResetCode/ResetCode";
import UpdatePasswoed from "./components/UpdatePasswoed/UpdatePasswoed";
import WishContextProvider from "./Context/WishContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              <Register />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "restpass",
          element: (
            <AuthProtectedRoute>
              <ResetPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "restcode",
          element: (
            <AuthProtectedRoute>
              <ResetCode />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "updatepass",
          element: (
            <AuthProtectedRoute>
              <UpdatePasswoed />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        // {path:'wishlist',element:<ProtectedRoute><WichList/></ProtectedRoute>},
        {
          path: "details/:cartId",
          element: (
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrder />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
        { path: "wishlist", element: <WichList /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <CounterContextProvider>
          <CartCounContextProvider>
            <WishContextProvider>
              <RouterProvider router={router}></RouterProvider>
            </WishContextProvider>
            <ToastContainer></ToastContainer>
          </CartCounContextProvider>
        </CounterContextProvider>
      </AuthContextProvider>
    </>
  );
}
