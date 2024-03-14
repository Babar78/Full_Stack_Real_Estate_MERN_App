import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { IoBookmarks } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 40, height: 40 }}
          src={user?.picture}
          alt="user Profile"
        >
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            display: "flex",
            gap: "0.8rem",
          }}
          onClick={() => navigate("/favourites", { replace: true })}
        >
          <MdOutlineFavorite size={20} />
          Favorites
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: "0.8rem",
          }}
          onClick={() => navigate("./bookings", { replace: true })}
        >
          <IoBookmarks size={20} />
          Bookings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            localStorage.clear();
            logout();
          }}
          sx={{
            display: "flex",
            gap: "0.8rem",
          }}
        >
          <TbLogout size={20} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
