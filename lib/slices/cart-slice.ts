import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find((item) => item.productId === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          productId: product.id,
          quantity,
          product,
        })
      }

      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item.productId === productId)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.productId !== productId)
        } else {
          item.quantity = quantity
        }
      }

      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
