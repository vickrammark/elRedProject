import axios from "axios";
import { productActions } from "../../Store/productReducer";

export const getAllProducts = async (dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const res = await axios.get(
      "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
    );
    dispatch(productActions.setAllProducts({ products: res.data.result }));
    setShowLoader(false);
    dispatch(
      productActions.setSelectedProduct({
        selectedProduct: res.data.result[0],
        selectedProductIndex: 0,
      })
    );
  } catch (error) {
    setShowLoader(false);
    console.log(error);
  }
};

export const getAllSubProducts = async (id, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const res = await axios.get(
      `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${id}.json`
    );
    setShowLoader(false);
    dispatch(productActions.setAllSubProducts({ products: res.data.result }));
  } catch (error) {
    console.log(error);
    setShowLoader(false);
  }
};

export const getAllPorductItems = async (id, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const res = await axios.get(
      `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${id}.json`
    );
    setShowLoader(false);
    dispatch(
      productActions.setAllProductItems({ productItems: res.data.result })
    );
  } catch (error) {
    console.log(error);
    setShowLoader(false);
  }
};
