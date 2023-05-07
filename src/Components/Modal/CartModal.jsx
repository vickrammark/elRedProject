import classes from "./CartModal.module.css";
import ReactDOM from "react-dom";
import ProductShowCaseCard from "../Common/Cards/ProductShowCase/ProductShowCaseCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productActions } from "../../Store/productReducer";
import ProductInfo from "../Product/Cart/ProductInfo/ProductInfo";
import Variant from "../Product/Cart/Variant/Variant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ProductForm from "../Product/Cart/ProductForm/ProductForm";
import CartTable from "../Product/Cart/CartTable/CartTable";
const CartModal = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state) => state.product.selectedProductsInCart
  );

  const selectedProductVariant = useSelector(
    (state) => state.product.selectedProductVariant
  );
  const selectedProduct = useSelector(
    (state) => state.product.selectedProductItem
  );
  const addProductToCart = (producDetails) => {
    dispatch(productActions.setSelectedProductInCart({ ...producDetails }));
  };
  const [selectedVariant, setSelectedVariant] = useState({});
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const handlClose = () => {
    props.setOpenModal(false);
  };
  useEffect(() => {
    dispatch(
      productActions.setSelectedProductVariant({
        selectedProductVariant: selectedProduct.variants[0],
      })
    );
    setSelectedVariant(selectedProduct.variants[0]);
  }, []);
  useEffect(() => {
    dispatch(
      productActions.setSelectedProductVariant({
        selectedProductVariant: selectedProduct.variants[selectedVariantIndex],
        selectedVariantIndex: selectedVariantIndex,
      })
    );
  }, [selectedVariant]);
  return ReactDOM.createPortal(
    <div className={classes.container}>
      <div className={classes.ProductContainer}>
        <div className={classes.productHeader}>
          {selectedProduct?.itemDescription}
        </div>
        <ProductShowCaseCard selectedProduct={selectedProduct} />
        {selectedProductVariant && (
          <ProductInfo
            variant={selectedProductVariant}
            selectedProduct={selectedProduct}
          />
        )}
        {selectedProduct && (
          <Variant
            header={"Please Select Color Description"}
            field={"colorDescription"}
            selectedProduct={selectedProduct}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            setSelectedVariantIndex={setSelectedVariantIndex}
          />
        )}
        {selectedProduct && (
          <Variant
            header={"Please Select Packaging Description"}
            field={"packingDescription"}
            selectedProduct={selectedProduct}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            setSelectedVariantIndex={setSelectedVariantIndex}
          />
        )}
        <ProductForm
          addProductToCart={addProductToCart}
          selectedVariant={selectedVariant}
          selectedProduct={selectedProduct}
        />
      </div>
      <div className={classes.OrderContainer}>
        <div className={classes.orderHeader}>
          <div className={classes.orderHeaderContent}>OrderList</div>
          <div
            className={classes.orderHeaderClose}
            onClick={() => props.setOpenModal(false)}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ width: "16px", height: "16px" }}
            />
          </div>
        </div>
        <div className={classes.cartTable}>
          <CartTable cartItems={cartItems} />
        </div>
        {cartItems.length > 0 && (
          <div className={classes.addCartButtonContainer}>
            <div
              className={classes.addCartToButton}
              onClick={() => {
                handlClose();
              }}
            >
              Add to Cart
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default CartModal;
