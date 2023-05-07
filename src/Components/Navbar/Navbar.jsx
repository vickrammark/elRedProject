import classes from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import userProfile from "../../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Search from "../Common/Search/Search";
const Navbar = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["logo-search-container"]}>
        <div className={classes.logo}>
          <img alt="logo" src={logo} className={classes["logo-image"]} />
        </div>
        <div className={classes.search}>
          <Search />
        </div>
      </div>
      <div className={classes["logo-profile-container"]}>
        <div className={classes["logo-container"]}>
          <div className={classes.logo}>
            <img alt="logo" src={logo} className={classes["logo-image"]} />
          </div>
          <div className={classes.icon}>
            <FontAwesomeIcon style={{ color: "grey" }} icon={faCaretDown} />
          </div>
        </div>
        <div className={classes["profile-container"]}>
          <div className={classes["user-profile-image"]}>
            <img
              alt="user-profile"
              src={userProfile}
              className={classes["logo-image"]}
            />
          </div>
          <div className={classes["user-info-container"]}>
            <div className={classes["user-name-container"]}>User Admin</div>
            <div className={classes["user-email-container"]}>
              useradmin@gmail.com
            </div>
          </div>
          <div className={classes.icon}>
            <FontAwesomeIcon style={{ color: "grey" }} icon={faCaretDown} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
