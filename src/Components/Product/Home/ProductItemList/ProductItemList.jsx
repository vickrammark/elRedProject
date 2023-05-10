import ProductItemCard from "../../../Common/Cards/ProductItemCards/ProductItemCard";
import ProductItemListClasses from "./ProductItemList.module.css";
const ProductItemList = ({ products, setOpenModal,setOpenedModalBy}) => {
  if (products.length === 0) {
    return (
      <div className={ProductItemListClasses.container}>
        No Products Available
      </div>
    );
  }
  return products.map((item) => {
    return (
      <ProductItemCard
        setOpenModal={setOpenModal}
        item={item}
        key={item.productId}
        name={item.itemDescription}
        url={item.productImages[0] ? item.productImages[0] : ""}
        id={item.productId}
        setOpenedModalBy={setOpenedModalBy}
      />
    );
  });
};

export default ProductItemList;
