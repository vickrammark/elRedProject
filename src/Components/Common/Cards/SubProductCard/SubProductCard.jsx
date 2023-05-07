import subProductClass from "./SubProductCard.module.css";
import product from "../../../../assets/sub_product.png";
import { useDispatch } from "react-redux";
import { productActions } from "../../../../Store/productReducer";
const SubProductCard = (props) => {
  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(
      productActions.setSelectedSubProduct({ selectedSubProduct: product })
    );
  };
  return (
    <div
      className={subProductClass.container}
      onClick={() => handleClick(props.item)}
      style={{
        backgroundImage: `url(${props.url === "" ? product : props.url})`,
      }}
    >
      <div className={subProductClass.content}>{props.name}</div>
    </div>
  );
};
export default SubProductCard;
