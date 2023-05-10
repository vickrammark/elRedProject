import classes from "./Cart.module.css";
import NoProduct from "../../../assets/NoCartItem.webp";
import { useSelector } from "react-redux";
import CartTable from "./CartTable/CartTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { MODAL_OPENED_BY } from "../../../Constants/Constant.Js";
const Cart = (props) => {
  const cartItems = useSelector(
    (state) => state.product.selectedProductsInCart
  );
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState("");
  useEffect(() => {
    const sumTotal = cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
    if (cartItems.length > 0) {
      setSymbol(cartItems[0].productDetail.currency.symbol);
    }
    setPrice(sumTotal);
  }, [cartItems]);
  const tax = Math.ceil((price * 9) / 100);
  return (
    <div className={classes.container}>
      {cartItems.length === 0 && (
        <div className={classes.cartMainContainer}>
          <img
            className={classes.NoCartItemImageContainer}
            src={NoProduct}
            alt={"No Product"}
          />
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className={classes.tableContainer}>
            <CartTable
              cartItems={cartItems}
              changeHeader={true}
              setOpenModal={props.setOpenModal}
              setOpenedModalBy={props.setOpenedModalBy}
              setChangeInitiatedFrom={props.setChangeInitiatedFrom}
            />
          </div>
          <div
            className={classes.seeMoreContainer}
            onClick={() => props.setOpenModal(true)}
          >
            <div
              className={classes.seeMoreContent}
              onClick={() => props.setOpenedModalBy(MODAL_OPENED_BY.SEE_ALL)}
            >
              See all
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                style={{ color: "rgb(150, 21, 21)", marginLeft: "5px" }}
              />
            </div>
          </div>
          <div className={classes.otherInstructionContainer}>
            <div className={classes.otherInstuctionContent}>
              Other Instructions
            </div>
            <div className={classes.addContainer}>Add</div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              style={{ color: "rgb(150, 21, 21)" }}
            />
          </div>
          <div className={classes.purchaseContainer}>
            <div className={classes.purchaseOrderText}>
              Purchase Order Number:
            </div>
            <div className={classes.purchaseOrderNumber}>10122343453</div>
          </div>
          <div className={classes.addressContainer}>
            <div className={classes.addressContent}>Addresses:</div>
            <div className={classes.viewContainer}>View </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              style={{ color: "rgb(150, 21, 21)" }}
            />
          </div>
          <div className={classes.address}>
            Office : 17 Anna Nagar chennai round road near pol...
          </div>
          <div className={classes.itemAmountContainer}>
            <div className={classes.itemAmountLabel}>Items Total</div>
            <div className={classes.amount}>
              {symbol}
              {price}
            </div>
          </div>
          <div className={classes.itemAmountContainer}>
            <div className={classes.itemAmountLabel}>SGST(9%)</div>
            <div className={classes.amount}>
              {symbol}
              {tax}
            </div>
          </div>
          <div className={classes.itemAmountContainer}>
            <div className={classes.itemAmountLabel}>CGST(9%)</div>
            <div className={classes.amount}>
              {symbol}
              {tax}
            </div>
          </div>
          <div className={classes.itemAmountContainer}>
            <div className={classes.itemAmountLabel}>IGST(9%)</div>
            <div className={classes.amount}>
              {symbol}
              {tax}
            </div>
          </div>
          <div className={classes.itemAmountContainer}>
            <div className={classes.itemAmountLabel}>Taxable Amount</div>
            <div className={classes.amount}>
              {symbol}
              {3 * tax}
            </div>
          </div>
          <div className={classes.sepeartor} />
          <div className={classes.finalAmountContainer}>
            <div className={classes.finaAmountLabel}>Order Total</div>
            <div className={classes.finalAmount}>
              {symbol}
              {3 * tax + price}
            </div>
          </div>
          <div className={classes.actionContainer}>
            <div className={classes.clearButton}>Clear Cart</div>
            <div className={classes.placeOrderButton}>Place Order</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
