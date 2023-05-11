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
import { MODAL_OPENED_BY } from "../../Constants/Constant.Js";
import { INITIATED_TABLE_BY } from "../../Constants/Constant.Js";
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
  const selectedTableItem = useSelector(
    (state) => state.product.selectedTableItem
  );
  const addProductToCart = (producDetails) => {
    dispatch(
      productActions.setSelectedProductInCart({
        ...producDetails,
        variants,
        colorIndex: selectedVariantTypeIndex,
        packageIndex: selectedPackageIndex,
      })
    );
  };
  const [selectedVariant, setSelectedVariant] = useState({});
  const [variants, setVariants] = useState({});
  const [selectedVariantTypeIndex, setSelectedVariantTypeIndex] = useState(0);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const handlClose = () => {
    props.setOpenModal(false);
  };
  const editProductInCart = (quantity) => {
    dispatch(
      productActions.editProductsInCart({
        index: selectedTableItem.index,
        productItem: {
          ...selectedTableItem,
          variants,
          colorIndex: selectedVariantTypeIndex,
          packageIndex: selectedPackageIndex,
          selectedVariant: selectedProductVariant,
          quantity,
          price:
            parseInt(quantity) * parseInt(selectedProductVariant.grossPrice),
        },
      })
    );
  };

  useEffect(() => {
    if (selectedTableItem) {
      dispatch(
        productActions.setProductItem({
          selectedProductItem: selectedTableItem.productDetail,
        })
      );
      dispatch(
        productActions.setSelectedProductVariant({
          selectedProductVariant: selectedTableItem.selectedVariant,
        })
      );
      setVariants(selectedTableItem.variants);
      setSelectedVariantTypeIndex(selectedTableItem.colorIndex);
      setSelectedPackageIndex(selectedTableItem.packageIndex);
    }
  }, [selectedTableItem]);

  useEffect(() => {
    let variants = selectedProduct.variants.reduce((data, item) => {
      const colorDesc = item.colorDescription;
      const packageDesc = item.packingDescription;
      const bpCatalogNumber = item.bpCatalogNumber;
      if (data[colorDesc]) {
        let val = data[colorDesc];
        val.push({ packageDesc, bpCatalogNumber });
        data[colorDesc] = val;
      } else {
        data[colorDesc] = [{ packageDesc, bpCatalogNumber }];
      }
      return data;
    }, {});
    setVariants(variants);
  }, [selectedProduct]);

  useEffect(() => {
    let val = getVariantType(0, 0, selectedProduct);
    dispatch(
      productActions.setSelectedProductVariant({
        selectedProductVariant: val,
      })
    );
    setSelectedVariant(val);
  }, [variants, selectedProduct]);

  useEffect(() => {
    let val = null;
    if (props.changeInitiatedFrom === INITIATED_TABLE_BY.FROM_VARIANT) {
      setSelectedPackageIndex(0);
      val = getVariantType(selectedVariantTypeIndex, 0, selectedProduct);
    } else {
      val = getVariantType(
        selectedVariantTypeIndex,
        selectedPackageIndex,
        selectedProduct
      );
    }
    dispatch(
      productActions.setSelectedProductVariant({
        selectedProductVariant: val,
      })
    );
    setSelectedVariant(val);
  }, [selectedVariantTypeIndex, selectedProduct]);

  useEffect(() => {
    const val = getVariantType(
      selectedVariantTypeIndex,
      selectedPackageIndex,
      selectedProduct
    );

    setSelectedVariant(val);
    dispatch(
      productActions.setSelectedProductVariant({
        selectedProductVariant: val,
      })
    );
  }, [selectedPackageIndex, selectedProduct]);

  useEffect(() => {
    if (
      cartItems.length === 0 &&
      props.modalOpenedBy === MODAL_OPENED_BY.EDIT
    ) {
      setOpenModal(false);
    }
  }, [cartItems]);

  const getVariantType = (
    variantIndex = 0,
    packageIndex = 0,
    selectedProduct
  ) => {
    let variantsType = Object.keys(variants);

    if (variantsType.length > 0) {
      let selectedVariantType = selectedProduct.variants.filter(
        (item) =>
          item.bpCatalogNumber ===
          variants[variantsType[variantIndex]][packageIndex].bpCatalogNumber
      );
      return selectedVariantType[0];
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`${classes.container} ${
        props.modalOpenedBy !== MODAL_OPENED_BY.SEE_ALL
          ? classes["container-expand"]
          : classes["container-shrink"]
      }`}
    >
      {props.modalOpenedBy !== MODAL_OPENED_BY.SEE_ALL && (
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
              field={"colorDesc"}
              selectedProduct={selectedProduct}
              selectedVariant={selectedVariant}
              activeIndex={selectedVariantTypeIndex}
              setSelectedVariant={setSelectedVariant}
              mappingItems={Object.keys(variants) ? Object.keys(variants) : []}
              setSelectedVariantIndex={setSelectedVariantTypeIndex}
              setChangeInitiatedFrom={props.setChangeInitiatedFrom}
            />
          )}
          {selectedProduct && (
            <Variant
              header={"Please Select Packaging Description"}
              field={"packageDesc"}
              selectedProduct={selectedProduct}
              activeIndex={selectedPackageIndex}
              selectedVariant={selectedVariant}
              selectedVariantTypeIndex={selectedVariantTypeIndex}
              setSelectedVariant={setSelectedVariant}
              mappingItems={
                Object.keys(variants).length > 0
                  ? Object.keys(variants)[selectedVariantTypeIndex]
                    ? variants[Object.keys(variants)[selectedVariantTypeIndex]]
                    : []
                  : []
              }
              setSelectedVariantIndex={setSelectedPackageIndex}
              setChangeInitiatedFrom={props.setChangeInitiatedFrom}
            />
          )}
          <ProductForm
            addProductToCart={addProductToCart}
            selectedVariant={selectedVariant}
            selectedProduct={selectedProduct}
            edit={props.modalOpenedBy === MODAL_OPENED_BY.EDIT ? true : false}
            quantity={
              cartItems.length === 0
                ? ""
                : selectedTableItem
                ? selectedTableItem.quantity
                : ""
            }
            editProductInCart={editProductInCart}
            cartItems={cartItems}
          />
        </div>
      )}
      <div className={classes.OrderContainer}>
        <div className={classes.orderHeader}>
          <div className={classes.orderHeaderContent}>OrderList</div>
          <div
            className={classes.orderHeaderClose}
            onClick={() => {
              props.setOpenModal(false);
              dispatch(
                productActions.setSelectedTableItem({
                  selectedTableItem: null,
                })
              );
            }}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ width: "16px", height: "16px" }}
            />
          </div>
        </div>
        <div className={classes.cartTable}>
          <CartTable
            cartItems={cartItems}
            setChangeInitiatedFrom={props.setChangeInitiatedFrom}
            edit={
              props.modalOpenedBy === MODAL_OPENED_BY.SEE_ALL ? false : true
            }
          />
        </div>
        {cartItems.length > 0 &&
          (props.modalOpenedBy === MODAL_OPENED_BY.SEE_ALL ? false : true) && (
            <div className={classes.addCartButtonContainer}>
              <div
                className={classes.addCartToButton}
                onClick={() => {
                  handlClose();
                }}
              >
                {props.modalOpenedBy === MODAL_OPENED_BY.EDIT
                  ? "Update to Cart"
                  : "Add to Cart"}
              </div>
            </div>
          )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default CartModal;
