import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../localStorage/localStorage";
import { apiCall } from "../apiCall/apiCall";

const TopNav = () => {
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  // menu click funciton
  const menuClick = () => {
    setIsMenu(!isMenu);
  };

  const logout = () => {
    removeUser();
    navigate("/login");
  };

  return (
    <div className="topNavContainer">
      <div className=" py-3 row col-12 position-fixed bg-dark z-3 navMother top-0">
        <div className=" col-md-2 offset-1 col-5  mt-3 fw-bold logoText text-start ">
          REGENERATION
        </div>
        <div className=" navTextContainer d-md-flex  mt-3 d-none col-md-7 offset-md-1">
          <NavLink to="/" activeClassName="selected">
            HOME
          </NavLink>
          <NavLink to="/BillingPlan">CART</NavLink>
          <NavLink to="/favorites">FAVORITES</NavLink>
          <NavLink to="/ingredients">INGREDIENTS</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <div onClick={logout} className=" loginBtn btn btn-sm btn-danger  ">
            LOG OUT
          </div>
        </div>

        <div
          className=" d-md-none d-flex flex-column rightMenu mt-3 ps-4  col-2 offset-4 "
          onClick={menuClick}
        >
          <div className={`menubar one ${isMenu && "rotateDown"}`}></div>
          <div className={`menubar two ${isMenu && "d-none"} `}></div>
          <div className={`menubar three ${isMenu && "rotateUp"} `}></div>
        </div>

        <div
          className={` menuGroup mt-2 d-md-none d-block col-10 offset-1 ps-2 ${
            !isMenu && "menuGroupNone"
          } `}
        >
          <NavLink
            to="/"
            className={`py-2  ms-3 mt-2 p-1 ${!isMenu && "menuUp"}`}
          >
            HOME
          </NavLink>
          <Link
            to="/BillingPlan"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            CART{" "}
          </Link>
          <NavLink
            to="/favorites"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            FAVORITES
          </NavLink>
          <NavLink
            to="/ingredients"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            INGREDIENTS
          </NavLink>
          <NavLink
            to="/about"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            CONTACT
          </NavLink>
          <div className={`py-2  mb-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}>
            LOG OUT
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopNav;
