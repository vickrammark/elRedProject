import classes from "./Menubar.module.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketball,
  faBoxesPacking,
  faBucket,
  faDashboard,
  faDigitalTachograph,
  faFileExcel,
  faHammer,
  faHeart,
  faPlaneArrival,
  faRoadBridge,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Menubar = (props) => {
  const [optionSelected, setOptionSelected] = useState("All Products");
  return (
    <div className={classes.container}>
      <div className={classes["logo-container"]}>
        <div className={classes["logo"]}>
          <img alt="logo" src={logo} className={classes["logo-image"]} />
        </div>
        <div className={classes["content"]}>Shop menus</div>
      </div>
      <div className={classes.optionContainer}>
        <div className={classes.options}>
          <div className={classes.icon}>
            <FontAwesomeIcon style={{ color: "#b8b8b8" }} icon={faDashboard} />
          </div>
          <div className={classes.content}>Dashboard</div>
        </div>
        <div className={`${classes.options} ${classes.active}`}>
          <div className={classes.icon}>
            <FontAwesomeIcon style={{ color: "#530526" }} icon={faBucket} />
          </div>
          <div className={classes.content}>All Products</div>
        </div>
        <div className={classes.options}>
          <div className={classes.icon}>
            <FontAwesomeIcon
              style={{ color: "#b8b8b8" }}
              icon={faBoxesPacking}
            />
          </div>
          <div className={classes.content}>Orders</div>
        </div>
        <div className={classes.options}>
          <div className={classes.icon}>
            <FontAwesomeIcon style={{ color: "#b8b8b8" }} icon={faHeart} />
          </div>
          <div className={classes.content}>Favorites</div>
        </div>
        <div className={classes.options}>
          <div className={classes.icon}>
            <FontAwesomeIcon
              style={{ color: "#b8b8b8" }}
              icon={faPlaneArrival}
            />
          </div>
          <div className={classes.content}>New Arrival</div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
