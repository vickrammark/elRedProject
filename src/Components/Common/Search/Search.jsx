import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import classes from "./Search.module.css";
const Search = (props) => {
  const [state, setState] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef();
  const handleInput = (e) => {
    setState(e.target.value);
  };
  const handleFocus = (e) => {
    setShowPlaceholder((state) => !state);
  };
  const handleOnClick = (e) => {
    inputRef.current.focus();
    setShowPlaceholder(false);
  };
  return (
    <>
      <div type="text" className={`${classes["customized-input-container"]}`}>
        {showPlaceholder && (
          <div className={classes["input-placeholder"]} onClick={handleOnClick}>
            <div>
              <FontAwesomeIcon style={{ color: "#bebebe" }} icon={faSearch} />{" "}
            </div>
            <div>
              <span className={classes["default-place-holder"]}>Search..</span>
            </div>
          </div>
        )}
        <input
          className={classes["customized-input"]}
          type="text"
          ref={inputRef}
          onChange={(e) => {
            handleInput(e);
          }}
          onFocus={(e) => {
            handleFocus(e);
          }}
          onBlur={(e) => {
            handleFocus(e);
          }}
        />
      </div>
    </>
  );
};
export default Search;
