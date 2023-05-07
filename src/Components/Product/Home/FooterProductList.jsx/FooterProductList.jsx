import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { productActions } from "../../../../Store/productReducer";
import FooterCard from "../../../Common/Cards/FooterCard/FooterCard";
import classses from "./Footer.module.css";
const FooterProductList = ({ products, selectedProduct }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      productActions.setSelectedSubProduct({ selectedSubProduct: null })
    );
  };

  return (
    <>
      <div className={classses.backHomeContainer} onClick={handleClick}>
        <FontAwesomeIcon
          icon={faHome}
          style={{ width: "30px", height: "30px" }}
          className={classses.fontAwesomeIcon}
        />
      </div>
      {products.map((item) => {
        return (
          <FooterCard
            item={item}
            key={item.subCategoryId}
            name={item.subCategoryName}
            url={item.subCategoryImageURL}
            id={item.categoryId}
            selectedProduct={selectedProduct}
          />
        );
      })}
    </>
  );
};

export default FooterProductList;
