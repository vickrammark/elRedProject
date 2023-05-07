import axios from "axios";
import { productActions } from "../../Store/productReducer";

export const getAllProducts = async (dispatch) => {
  const res = await axios.get(
    "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
  );
  dispatch(productActions.setAllProducts({ products: res.data.result }));
  dispatch(
    productActions.setSelectedProduct({
      selectedProduct: res.data.result[0],
      selectedProductIndex: 0,
    })
  );
};

export const getAllSubProducts = async (id, dispatch) => {
  const res = await axios.get(
    `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${id}.json`
  );
  dispatch(productActions.setAllSubProducts({ products: res.data.result }));
};

export const getAllPorductItems=async(id,dispatch)=>{
  const res= await axios.get(`https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${id}.json`);
  dispatch(productActions.setAllProductItems({productItems:res.data.result}))
}