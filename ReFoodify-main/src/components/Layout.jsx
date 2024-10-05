import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="">
      <Header />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}
