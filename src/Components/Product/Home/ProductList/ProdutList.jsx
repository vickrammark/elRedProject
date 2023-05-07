import ProductCard from "../../../Common/Cards/ProductCard/ProductCard";

const ProductList = ({ products,selectedProduct }) => {
  return products.map((item, index) => {
    return (
      <ProductCard
        id={index}
        categoryId={item.categoryId}
        item={item}
        key={item.categoryId}
        url={item.categoryImageURL}
        name={item.categoryName}
        selectedProduct={selectedProduct}
      />
    );
  });
};

export default ProductList;
