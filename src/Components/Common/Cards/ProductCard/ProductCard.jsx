import productClass from "./product.module.css";
import product from "../../../../assets/default_product.jpg";
import { useDispatch } from "react-redux";
import { productActions } from "../../../../Store/productReducer";
const ProductCard = (props) => {
  const dispatch = useDispatch();
  const setSelectedProduct = (index, product) => {
    dispatch(
      productActions.setSelectedProduct({
        selectedProductIndex: index,
        selectedProduct: product,
      })
    );
  };
  return (
    <div
      className={`${productClass.container} ${
        props.selectedProduct.categoryId === props.categoryId
          ? productClass.cardSelected
          : ""
      }`}
      onClick={() => setSelectedProduct(props.id, props.item)}
    >
      <div
        className={productClass.cardInnerContainer}
        style={{
          backgroundImage: `url(${props.url === "" ? product : props.url})`,
        }}
      >
        <div className={productClass.content}>{props.name}</div>
      </div>
    </div>
  );
};

export default ProductCard;
