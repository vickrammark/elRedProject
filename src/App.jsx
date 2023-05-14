import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import classes from "./App.module.css";
import Menubar from "./Components/Menubar/Menubar";
import Home from "./Components/Product/Home/Home";
import Cart from "./Components/Product/Cart/Cart";
import FooterProductList from "./Components/Product/Home/FooterProductList.jsx/FooterProductList";
import { useSelector } from "react-redux";
import { MODAL_OPENED_BY } from "./Constants/Constant.Js";
import { INITIATED_TABLE_BY } from "./Constants/Constant.Js";
function App() {
  const products = useSelector((state) => state.product.subProducts);
  const [openModal, setOpenModal] = useState(false);
  const [modalOpenedBy, setOpenedModalBy] = useState(MODAL_OPENED_BY.PRODUCT);
  const [changeInitiatedFrom, setChangeInitiatedFrom] = useState(
    INITIATED_TABLE_BY.FROM_VARIANT
  );
  const selectedSubProduct = useSelector(
    (state) => state.product.selectedSubProduct
  );
  return (
    <div className={classes.mainContainer}>
      <div className={classes.navContainer}>
        <Navbar />
      </div>
      <div className={classes.parentContainer}>
        <div className={classes.container}>
          <div className={classes.innerSubContainer}>
            <Menubar />
            <Home
              openModal={openModal}
              setOpenModal={setOpenModal}
              setOpenedModalBy={setOpenedModalBy}
              modalOpenedBy={modalOpenedBy}
              setChangeInitiatedFrom={setChangeInitiatedFrom}
              changeInitiatedFrom={changeInitiatedFrom}
            />
          </div>
          {selectedSubProduct && (
            <div className={classes.footerContainer}>
              <FooterProductList
                products={products}
                selectedProduct={selectedSubProduct}
              />
            </div>
          )}
        </div>
        <div className={classes.cartContainer}>
          <Cart
            openModal={openModal}
            setOpenModal={setOpenModal}
            setOpenedModalBy={setOpenedModalBy}
            setChangeInitiatedFrom={setChangeInitiatedFrom}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
