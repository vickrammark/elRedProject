import classes from "./ProductInfo.module.css";
const ProductInfo = ({ variant, selectedProduct }) => {
  return (
    <div className={classes.container}>
      <div className={classes.colorCode}>#{variant.colorCode}</div>
      <div className={classes.namePrice}>
        <div className={classes.name}>{selectedProduct.itemDescription}</div>
        <div className={classes.price}>
          {selectedProduct.currency.symbol}
          {variant.grossPrice}
        </div>
      </div>
      <div className={classes.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries
      </div>
    </div>
  );
};
export default ProductInfo;
