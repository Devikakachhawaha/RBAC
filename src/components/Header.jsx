import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#00040E] text-white p-8 flex justify-between items-center">
      <h1 className="text-lg font-bold cursor-pointer">RBAC Dashboard</h1>

      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="block  md:hidden p-2 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className="space-x-4  hidden md:block ">
        <NavLink
          to="/users"
          className="hover:text-blue-400 hover:underline transition ease-out duration-300"
        >
          Users
        </NavLink>
        <NavLink
          to="/roles"
          className="hover:text-blue-400 hover:underline transition ease-out duration-300"
        >
          Roles
        </NavLink>
        <NavLink
          to="/permissions"
          className="hover:text-blue-400 hover:underline transition ease-out duration-300"
        >
          Permissions
        </NavLink>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 right-0 bg-gray-800 text-white w-40 p-4 rounded shadow-lg z-50 md:hidden"
        >
          <NavLink to="/users" className="block px-4 py-2 hover:bg-gray-700">
            Users
          </NavLink>
          <NavLink to="/roles" className="block px-4 py-2 hover:bg-gray-700">
            Roles
          </NavLink>
          <NavLink
            to="/permissions"
            className="block px-4 py-2 hover:bg-gray-700"
          >
            Permissions
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
