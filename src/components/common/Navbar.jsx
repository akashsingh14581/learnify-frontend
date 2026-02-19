import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { FaCartShopping, FaChevronDown } from "react-icons/fa6";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("could not fetch the catalog list", error.message);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="w-full h-14 border-b border-b-richblack-700">
      <div className="flex items-center justify-between w-11/12 h-full mx-auto">
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} loading="lazy" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex items-center gap-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-1 text-white cursor-pointer group">
                    <p>{link.title}</p>
                    <FaChevronDown />

                    {/* Dropdown */}
                    <div
                      className="
                        absolute top-full left-1/2 -translate-x-1/2
                        w-[300px] rounded-md bg-richblack-5 p-4 text-richblack-900 shadow-md
                        opacity-0 pointer-events-none
                        group-hover:opacity-100 group-hover:pointer-events-auto
                        transition-all duration-200 z-50
                      "
                    >
                      <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -top-2 left-1/2 bg-richblack-5"></div>

                      {subLinks?.length ? (
                        subLinks.map((sublink, i) => (
                          <Link to={sublink.link} key={i}>
                            <p className="py-1 hover:text-blue-600">
                              {sublink.title}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p>No Categories</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}   // important for Home
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-yellow-50"
                          : "text-white hover:text-yellow-50"
                      }`
                    }
                  >
                    <p>{link.title}</p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping className="text-white text-lg" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-50 text-black text-xs px-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="flex gap-4">
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
