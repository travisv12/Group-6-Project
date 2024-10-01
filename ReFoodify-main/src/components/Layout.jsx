import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="">
      <Header />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
}
