import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
    selectedProductIndex: 0,
    subProducts: [],
    selectedSubProduct: null,
    productItems: [],
    selectedProductItem: null,
    selectedProductVariant: null,
    selectedProductsInCart: [],
    selectedTableItem: null,
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload.selectedProduct;
      state.selectedProductIndex = action.payload.selectedProductIndex;
    },
    setAllSubProducts: (state, action) => {
      state.subProducts = action.payload.products;
    },
    setSelectedSubProduct: (state, action) => {
      state.selectedSubProduct = action.payload.selectedSubProduct;
    },
    setAllProductItems: (state, action) => {
      state.productItems = action.payload.productItems;
    },
    setProductItem: (state, action) => {
      state.selectedProductItem = action.payload.selectedProductItem;
    },
    setSelectedProductVariant: (state, action) => {
      state.selectedProductVariant = action.payload.selectedProductVariant;
    },
    setSelectedTableItem: (state, action) => {
      state.selectedTableItem = action.payload.selectedTableItem;
    },
    setSelectedProductInCart: (state, action) => {
      const selectedProduct = action.payload.selectedProduct;
      const selectedVariant = action.payload.selectedVariant;
      const quantity = action.payload.quantity;
      const variants = action.payload.variants;
      const colorIndex = action.payload.colorIndex;
      const packageIndex = action.payload.packageIndex;
      const arry = state.selectedProductsInCart;
      const findIndex = state.selectedProductsInCart.findIndex((item) => {
        return (
          item.productDetail.productId === selectedProduct.productId &&
          item.selectedVariant.bpCatalogNumber ===
            selectedVariant.bpCatalogNumber
        );
      });
      if (findIndex >= 0) {
        const updatedProduct = state.selectedProductsInCart[findIndex];
        updatedProduct.quantity = parseInt(quantity);
        updatedProduct.price =
          parseInt(updatedProduct.quantity) *
          parseInt(selectedVariant.grossPrice);
        state.selectedProductsInCart[findIndex] = updatedProduct;
      } else {
        state.selectedProductsInCart.push({
          price: parseInt(quantity) * parseInt(selectedVariant.grossPrice),
          quantity: parseInt(quantity),
          productDetail: selectedProduct,
          selectedVariant: selectedVariant,
          variants,
          colorIndex,
          packageIndex,
        });
      }
    },
    deleteProductInCart: (state, action) => {
      const data = state.selectedProductsInCart.filter(
        (item) =>
          !(
            item.productDetail.productId ===
              action.payload.productDetail.productId &&
            item.selectedVariant.bpCatalogNumber ===
              action.payload.selectedVariant.bpCatalogNumber
          )
      );
      state.selectedProductsInCart = data;
    },
  },
});

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
