import { Outlet } from "react-router-dom";
import TopNav from "../components/topNav";
import Footer from "../components/footer";

const NavBar = () => {
  return (
    <div>
      <TopNav />
      <Outlet />
      <Footer />
    </div>
  );
};
export default NavBar;
