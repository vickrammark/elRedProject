import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductShowCase.module.css";
import NoProduct from "../../../../assets/NoProductItem.jpg";
const ProductShowCaseCard = ({ selectedProduct }) => {
  const url = selectedProduct?.productImages[0]
    ? selectedProduct.productImages[0]
    : "";

  return (
    <div className={classes.container}>
      <img
        src={`${url === "" ? NoProduct : url}`}
        alt={"Product Item"}
        className={classes.image}
      />
      <div className={classes.favourite}>
        <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
      </div>
    </div>
  );
};
export default ProductShowCaseCard;
