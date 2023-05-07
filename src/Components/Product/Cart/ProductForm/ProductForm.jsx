import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classes from "./ProductForm.module.css";
const ProductForm = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  return (
    <div className={classes.container}>
      <div className={classes.label}>Enter Quantity</div>
      <div className={classes.inputQuantity}>
        <input
          type={"number"}
          className={classes.customInput}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
        {((submitted && quantity <= 12) || (touched && quantity <= 12)) && (
          <div className={classes.helpText}>Minimum orders 12*</div>
        )}
      </div>
      <div className={classes.urgentOrderCheckBox}>
        <input type="checkbox" /> Need Urgent Order
      </div>
      <div className={classes.buttonContainer}>
        <div
          className={classes.button}
          onClick={() => {
            setSubmitted(true);
            if (quantity > 12) {
              props.addProductToCart({
                selectedProduct: props.selectedProduct,
                quantity: quantity,
                selectedVariant: props.selectedVariant,
              });
              setSubmitted(false);
            }
          }}
        >
          Add
        </div>
      </div>
    </div>
  );
};
export default ProductForm;
