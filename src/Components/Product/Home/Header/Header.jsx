import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { productActions } from "../../../../Store/productReducer";
import Search from "../../../Common/Search/Search";
import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      productActions.setSelectedSubProduct({ selectedSubProduct: null })
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.title} onClick={handleClick}>
        {props.selectedSubProduct ? (
          <>
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            <span className={classes.defaultContent}>All Products</span>
          </>
        ) : (
          props.name
        )}
      </div>
      <div className={classes.search}>
        <Search />
      </div>
    </div>
  );
};

export default Header;
