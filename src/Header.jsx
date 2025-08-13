import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Launches", path: "/launches" },
    { label: "Blog", path: "/blog" },
  ];

  const getLinkClass = (path) =>
    `font-semibold px-4 py-1.5 rounded border-0 ${
      pathname === path ? "text-white bg-black" : "text-blue-500 bg-white"
    }`;

  return (
    <Box className="flex items-center justify-between bg-blue-500 p-4">
      <Typography className="text-white !font-semibold">
        Welcome {user?.email}
      </Typography>
      <div className="flex items-center gap-2">
        {menuItems.map(({ label, path }) => (
          <Link key={path} to={path} className={getLinkClass(path)}>
            {label}
          </Link>
        ))}
        <Button
          variant="outlined"
          className="!text-blue-500 !bg-white font-semibold px-4 py-1.5 rounded !border-0"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Box>
  );
};

export default Header;
