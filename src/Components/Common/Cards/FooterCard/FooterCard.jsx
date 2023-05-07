import { useDispatch } from "react-redux";
import { productActions } from "../../../../Store/productReducer";
import FooterCardClasses from "./FooterCard.module.css";
const FooterCard = (props) => {
  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(
      productActions.setSelectedSubProduct({ selectedSubProduct: product })
    );
  };

  return (
    <div
      onClick={() => handleClick(props.item)}
      className={`${FooterCardClasses.container} ${
        props.selectedProduct.categoryId === props.categoryId
          ? FooterCardClasses.active
          : ""
      }`}
      style={{
        backgroundImage: `url(${props.url === "" ? product : props.url})`,
      }}
    >
      <div className={FooterCardClasses.title}>{props.name}</div>
    </div>
  );
};
export default FooterCard;
