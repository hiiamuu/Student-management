import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
    `text-sm transition ${
        isActive
            ? "text-red font-medium"
            : "text-gray-400 hover:text-gray-200"
    }`;

const Navbar = () => {
    return (
        <header className="flex h-14 items-center gap-8 bg-amber-200 px-8">
            <span className="text-base font-semibold text-white">MyApp</span>
            <nav className="flex gap-6">
                <NavLink to="/" end className={navLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/about" className={navLinkClass}>
                    About
                </NavLink>
                <NavLink to="/contact" className={navLinkClass}>
                    Contact
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
