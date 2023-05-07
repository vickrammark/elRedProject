import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import classes from "./App.module.css";
import Menubar from "./Components/Menubar/Menubar";
import Home from "./Components/Product/Home/Home";
import Cart from "./Components/Product/Cart/Cart";
import FooterProductList from "./Components/Product/Home/FooterProductList.jsx/FooterProductList";
import { useSelector } from "react-redux";
function App() {
  const products = useSelector((state) => state.product.subProducts);
  const [openModal, setOpenModal] = useState(false);
  const selectedSubProduct = useSelector(
    (state) => state.product.selectedSubProduct
  );
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "75%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.navContainer}>
        <Navbar />
      </div>
      <div className={classes.parentContainer}>
        <div className={classes.container}>
          <div className={classes.innerMainContainer}>
            <div className={classes.innerSubContainer}>
              <Menubar />
              <Home openModal={openModal} setOpenModal={setOpenModal} />
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
        </div>
        <div className={classes.cartContainer}>
          <Cart openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </div>
    </div>
  );
}

export default App;
