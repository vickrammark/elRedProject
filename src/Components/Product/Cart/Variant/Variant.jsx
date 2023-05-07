import { useEffect, useState } from "react";
import classes from "./Variant.module.css";

const Variant = (props) => {
  const [variants, setVariants] = useState([]);
  useEffect(() => {
    if (props.selectedProduct) {
      setVariants(props.selectedProduct.variants);
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.header}>{props.header}</div>
      <div className={classes.variantContainer}>
        {variants.map((item,index) => {
          return (
            <div
              key={item.bpCatalogNumber}
              onClick={() => {
                props.setSelectedVariant(item);
                props.setSelectedVariantIndex(index);
              }}
              className={`${
                props.selectedVariant.bpCatalogNumber === item.bpCatalogNumber
                  ? classes.variantItemActive
                  : classes.variantItemInActive
              }`}
            >
              {item[props.field]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Variant;
