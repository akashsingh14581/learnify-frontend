import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo/logo.png";
import { NavbarLinks, sampleCategories } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { FaCartShopping, FaChevronDown, FaBars, FaXmark } from "react-icons/fa6";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false); // mobile catalog toggle

const fetchSublinks = async () => {
  try {
    const result = await apiConnector("GET", categories.CATEGORIES_API);
    const data = result?.data?.allCategory; // ✅ "data" nahi, "allCategory" hai
    if (data && data.length > 0) {
      setSubLinks(data);
    } else {
      setSubLinks(sampleCategories); // fallback jab DB mein koi category nahi
    }
  } catch (error) {
    console.log("could not fetch the catalog list", error.message);
    setSubLinks(sampleCategories);
  }
};

  useEffect(() => {
    fetchSublinks();
  }, []);

  // Close mobile menu on route change
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="w-full h-14 border-b border-b-richblack-700 relative z-50">
      <div className="flex items-center justify-between w-11/12 h-full mx-auto">

        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="logo" width={200} loading="lazy" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-1 text-white cursor-pointer group">
                    <p>{link.title}</p>
                    <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] rounded-md bg-richblack-5 p-4 text-richblack-900 shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -top-2 left-1/2 bg-richblack-5"></div>
                      {subLinks?.length ? (
                        subLinks.map((sublink, i) => (
                          <Link to={sublink.link} key={i}>
                            <p className="py-1.5 px-2 rounded hover:bg-richblack-50 hover:text-blue-600 transition-colors text-sm">
                              {sublink.title}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-richblack-500">No Categories</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive ? "text-yellow-50" : "text-white hover:text-yellow-50"
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
        <div className="flex items-center gap-4">
          {/* Cart - always visible */}
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

          {/* Desktop Auth Buttons */}
          {token === null && (
            <div className="hidden md:flex gap-3">
              <NavLink to="/login">
                {({ isActive }) => (
                  <button className={`px-4 py-2 border rounded transition-all ${isActive ? "bg-yellow-50 text-black border-yellow-50" : "bg-richblack-800 text-white border-richblack-700"}`}>
                    Log In
                  </button>
                )}
              </NavLink>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <button className={`px-4 py-2 border rounded transition-all ${isActive ? "bg-yellow-50 text-black border-yellow-50" : "bg-richblack-800 text-white border-richblack-700"}`}>
                    Sign Up
                  </button>
                )}
              </NavLink>
            </div>
          )}

          {token !== null && <ProfileDropDown />}

          {/* Hamburger Button - Mobile only */}
          <button
            className="md:hidden text-white text-xl p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-richblack-800 border-t border-richblack-700 z-40 flex flex-col">
          {/* Regular Nav Links */}
          {NavbarLinks.map((link, index) => (
            link.title === "Catalog" ? (
              <div key={index}>
                <button
                  className="w-full flex items-center justify-between text-white px-6 py-3 hover:bg-richblack-700 transition-colors"
                  onClick={() => setCatalogOpen(!catalogOpen)}
                >
                  <span>Catalog</span>
                  <FaChevronDown className={`text-xs transition-transform ${catalogOpen ? "rotate-180" : ""}`} />
                </button>
                {catalogOpen && (
                  <div className="bg-richblack-900 px-6 py-2 flex flex-col gap-1">
                    {subLinks?.length ? (
                      subLinks.map((sublink, i) => (
                        <Link
                          to={sublink.link}
                          key={i}
                          className="text-richblack-200 text-sm py-2 pl-3 border-l-2 border-richblack-600 hover:border-yellow-50 hover:text-yellow-50 transition-all"
                          onClick={closeMobileMenu}
                        >
                          {sublink.title}
                        </Link>
                      ))
                    ) : (
                      <p className="text-richblack-400 text-sm py-1">No Categories</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={link.path}
                end={link.path === "/"}
                key={index}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-6 py-3 text-sm transition-colors ${
                    isActive
                      ? "text-yellow-50 bg-richblack-700"
                      : "text-white hover:bg-richblack-700"
                  }`
                }
              >
                {link.title}
              </NavLink>
            )
          ))}

          {/* Mobile Auth Buttons */}
          {token === null && (
            <div className="flex gap-3 px-6 py-4 border-t border-richblack-700">
              <NavLink to="/login" className="flex-1" onClick={closeMobileMenu}>
                <button className="w-full py-2 text-sm border border-richblack-600 rounded text-white bg-richblack-700 hover:border-yellow-50 transition-all">
                  Log In
                </button>
              </NavLink>
              <NavLink to="/signup" className="flex-1" onClick={closeMobileMenu}>
                <button className="w-full py-2 text-sm border border-yellow-50 rounded text-black bg-yellow-50 hover:opacity-90 transition-all">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;