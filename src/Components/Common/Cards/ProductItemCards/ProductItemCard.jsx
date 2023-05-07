import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductItemClasses from "./ProductItemCard.module.css";
import NoProduct from "../../../../assets/NoProductItem.jpg";
import { useDispatch } from "react-redux";
import { productActions } from "../../../../Store/productReducer";

const ProductItemCard = (props) => {
  const dispatch = useDispatch();
  return (
    <div
      className={ProductItemClasses.container}
      onClick={() => {
        dispatch(
          productActions.setProductItem({ selectedProductItem: props.item })
        );
        props.setOpenModal(true);
      }}
    >
      <div className={ProductItemClasses.imageContainer}>
        <img
          src={`${props.url === "" ? NoProduct : props.url}`}
          alt="Product Item"
          className={ProductItemClasses.image}
        />
      </div>
      <div className={ProductItemClasses.favourite}>
        <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
      </div>
      <div className={ProductItemClasses.title}>{props.name}</div>
      <div className={ProductItemClasses.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries
      </div>
    </div>
  );
};

export default ProductItemCard;
