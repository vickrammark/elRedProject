import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPorductItems,
  getAllProducts,
  getAllSubProducts,
} from "../../../API/ProductAPI";
import CartModal from "../../Modal/CartModal";
import Header from "./Header/Header";
import classes from "./Home.module.css";
import ProductItemList from "./ProductItemList/ProductItemList";
import ProductList from "./ProductList/ProdutList";
import SubProductList from "./SubProductList/SubProductList";

const Home = (props) => {
  const products = useSelector((state) => state.product.products);
  const subProducts = useSelector((state) => state.product.subProducts);
  const productItems = useSelector((state) => state.product.productItems);
  const checkRef = useRef(false);
  const dispatch = useDispatch();
  const selectedSubProduct = useSelector(
    (state) => state.product.selectedSubProduct
  );
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  useEffect(() => {
    if (!checkRef.current) {
      checkRef.current = true;
      getAllProducts(dispatch);
    }
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      getAllSubProducts(selectedProduct.categoryId, dispatch);
    }
  }, [products, selectedProduct]);
  useEffect(() => {
    if (subProducts.length > 0 && selectedSubProduct) {
      getAllPorductItems(selectedSubProduct.subCategoryId, dispatch);
    }
  }, [subProducts, selectedSubProduct]);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header
          name={selectedProduct ? selectedProduct.categoryName : ""}
          selectedSubProduct={selectedSubProduct}
        />
      </div>
      {selectedSubProduct === null ? (
        <>
          <div className={classes.product}>
            <ProductList
              products={products}
              selectedProduct={selectedProduct}
            />
          </div>
          <div className={classes.sperator} />
          <div className={classes.subProduct}>
            <SubProductList products={subProducts} />
          </div>
        </>
      ) : (
        <div className={classes.productItem}>
          <ProductItemList
            products={productItems}
            setOpenModal={props.setOpenModal}
          />
        </div>
      )}
      {props.openModal && <CartModal setOpenModal={props.setOpenModal} />}
    </div>
  );
};

export default Home;
