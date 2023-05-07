import SubProductCard from "../../../Common/Cards/SubProductCard/SubProductCard";
import SubProductClass from "./SubProductList.module.css";
import NoProduct from "../../../../assets/no-product-found.png";
const SubProductList = ({ products, setOpenModal }) => {
  if (products.length === 0) {
    return (
      <div className={SubProductClass.container}>
        <img
          alt="No product"
          src={NoProduct}
          className={SubProductClass.image}
        />
      </div>
    );
  }
  return products.map((item) => {
    return (
      <SubProductCard
        item={item}
        key={item.subCategoryId}
        name={item.subCategoryName}
        url={item.subCategoryImageURL}
        id={item.categoryId}
        setOpenModal={setOpenModal}
      />
    );
  });
};
export default SubProductList;
