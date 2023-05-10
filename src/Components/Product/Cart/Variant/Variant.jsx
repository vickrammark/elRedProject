import { useEffect, useState } from "react";
import classes from "./Variant.module.css";

const Variant = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>{props.header}</div>
      <div className={classes.variantContainer}>
        {props.mappingItems.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                props.setSelectedVariantIndex(index);
                props.setChangeInitiatedFrom("variant");
              }}
              className={`${
                props.activeIndex === index
                  ? classes.variantItemActive
                  : classes.variantItemInActive
              }`}
            >
              {props.field === "colorDesc" ? item : item.packageDesc}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Variant;
