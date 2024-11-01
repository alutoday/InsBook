import "./navbar.scss";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logout from "@mui/icons-material/Logout";

import { BsMessenger } from "react-icons/bs";

import { IoNotifications } from "react-icons/io5";
import { MdSunny, MdDarkMode } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Navbar = () => {
  const nav = useNavigate();

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [menuProfile, setMenuProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogOut = async () => {
    await axios.post('http://localhost:8080/api/auth/logout');
    setCurrentUser(null);
    nav("/login");
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/search?term=${e.target.value}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Error fetching search results", err);
      }
    } else {
      setSearchResults([]); 
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>InsBook</span>
        </Link>
      </div>

      <div className="search">
        <SearchOutlinedIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(user => (
              <Link to={`/profile/${user.id}`} key={user.id} className="search-result-item">
                <img src={user.profilePicture || "/upload/user.png"} alt={user.name} />
                <span>{user.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="right">
        <div className="icons">
          <div className="darkMode icon">
            {darkMode ? (
              <MdSunny onClick={toggle} />
            ) : (
              <MdDarkMode onClick={toggle} />
            )}
          </div>
          <div className="icon">
            <Link to={`/messenger/${currentUser.id}`}>
              <BsMessenger className="messengerIcon" />
            </Link>
          </div>
          <div className="nonIcon icon">
            <IoNotifications />
          </div>
        </div>
        <div className="user" onClick={() => setMenuProfile(!menuProfile)}>
          <img
            src={currentUser.profilePicture ? "/upload/" + currentUser.profilePicture : "/upload/user.png"}
            alt=""
          />
          {menuProfile && (
            <div className="profile-menu">
              <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none" }}>
                <div className="menu-item">
                  <div className="menu-item__icon">
                    <img
                      src={currentUser.profilePicture ? "/upload/" + currentUser.profilePicture : "/upload/user.png"}
                      alt=""
                    />
                  </div>
                  <button>{currentUser.name}</button>
                </div>
              </Link>
              <div className="menu-item" onClick={handleLogOut}>
                <div className="menu-item__icon">
                  <Logout />
                </div>
                <button>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
