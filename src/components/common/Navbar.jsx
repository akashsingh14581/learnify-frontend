import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sublinks data", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("could not fetch the catelog list", error.message);
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };
  return (
    <div className="w-full border h-14 border-b-[1px] border-b-richblack-700">
      <div className="flex items-center justify-between w-11/12 h-full gap-5 mx-auto">
        {/* logo */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} loading="lazy" />
        </Link>

        {/* navlink */}
        <nav>
          <ul className="flex items-center justify-center gap-5">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-1 text-white cursor-pointer group">
                      <p>{link.title} </p> <FaChevronDown />{" "}
                      <div
                        className="absolute invisible group-hover:visible bg-richblack-5 
p-4 text-richblack-900 w-[300px]
left-1/2 -translate-x-1/2 top-full mt-0
shadow-md rounded-md z-50"
                      >
                        <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -top-2 left-1/2 bg-richblack-5"></div>
                        {subLinks?.length ? (
                          subLinks.map((sublink, index) => (
                            <Link to={`${sublink.link}`} key={index}>
                              <p>{sublink.title}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      className={`${
                        matchRoute(link?.path) ? "text-yellow-5" : "text-white"
                      }`}
                      to={link?.path}
                    >
                      {" "}
                      <p>{link.title}</p>{" "}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="flex items-center justify-between gap-5">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <div className="flex gap-5">
              <Link to="/login">
                <button className="px-4 py-2 text-white border rounded bg-richblack-800 border-richblack-700">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 text-white border rounded border-richblack-700 bg-richblack-800">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
