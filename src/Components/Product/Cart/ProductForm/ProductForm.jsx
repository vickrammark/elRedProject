import { faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classes from "./ProductForm.module.css";
const ProductForm = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    setQuantity(props.quantity);
  }, [props.quantity]);
  useEffect(()=>{
    if(props.cartItems?.length===0){
      setSubmitted(false);
      setTouched(false);
    }
  },[props.cartItems])
  return (
    <div className={classes.container}>
      <div className={classes.label}>Enter Quantity</div>
      <div className={classes.inputQuantity}>
        <input
          type={"number"}
          value={quantity}
          className={classes.customInput}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
        {((submitted && quantity < 12) || (touched && quantity < 12)) && (
          <div className={classes.helpText}>Minimum orders 12*</div>
        )}
        {((submitted && quantity > 100) || (touched && quantity > 100)) && (
          <div className={classes.helpText}>Maximum orders 100*</div>
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
            if (quantity >= 12 && quantity <= 100) {
              if (props.edit) {
                props.editProductInCart(quantity);
              } else {
                props.addProductToCart({
                  selectedProduct: props.selectedProduct,
                  quantity: quantity,
                  selectedVariant: props.selectedVariant,
                });
                setSubmitted(false);
              }
            }
          }}
        >
          {props.edit
            ? props.cartItems?.length > 0
              ? "Update"
              : "Add"
            : "Add"}
        </div>
      </div>
    </div>
  );
};
export default ProductForm;
