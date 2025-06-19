import { Product } from "@/types";
import { mockProducts } from "../mock-data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: mockProducts,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    setProduct(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },

    editProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<Product>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addProduct, deleteProduct, editProduct, setProduct } =
  productSlice.actions;

export default productSlice.reducer;
