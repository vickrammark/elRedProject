import classes from "./FinalPlaceOrderModal.module.css";
import ReactDOM from "react-dom";
const FinalPlaceOrderModal = (props) => {
  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} />
      <div className={classes.modal}>
        <div className={classes.content}>Your Order Placed Successfully!!</div>
        <div
          className={classes.buttonContainer}
          onClick={() => props.setOpenPlaceOrderModal(false)}
        >
          Ok
        </div>
      </div>
    </>,
    document.getElementById("portal1")
  );
};

export default FinalPlaceOrderModal;
