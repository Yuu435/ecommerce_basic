import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Root() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} newestOnTop={false}/>
    </>
  );
}
