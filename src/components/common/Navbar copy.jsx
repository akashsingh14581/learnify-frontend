import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'

function Navbar() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b h-14 border-richblack-700 bg-richblack-900/80 backdrop-blur-md">
      <div className="flex items-center justify-between w-11/12 h-full gap-5 mx-auto">

        <img src={logo} alt="logo" width={160} loading="lazy" />

        <nav>
          <ul className="flex items-center gap-6 text-richblack-200">

            {NavbarLinks.map((link, index) => (
              <li key={index}>

                {link.title === "Catalog" ? (
                  <span className="cursor-pointer">Catalog</span>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-semibold"
                        : "text-richblack-200 hover:text-white transition-all"
                    }
                  >
                    {link.title}
                  </NavLink>
                )}

              </li>
            ))}

          </ul>
        </nav>

      </div>
    </div>
  )
}

export default Navbar
