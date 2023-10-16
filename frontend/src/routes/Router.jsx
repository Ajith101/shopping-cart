import { createBrowserRouter, useLocation } from "react-router-dom";
import Hero from "../pages/Hero";
import Header from "../components/nav/Header";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "./../pages/Register";
import Cart from "./../pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "../../store/appStore";
import { useEffect } from "react";
import { DetailPage } from "../pages";
import Loader from "../components/Loader";

const Layout = () => {
  const { pathname } = useLocation();
  const { loading } = useAppStore();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      {loading && <Loader />}
      <ToastContainer autoClose={500} />
      <Header />
      <Outlet />
    </>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default routes;
