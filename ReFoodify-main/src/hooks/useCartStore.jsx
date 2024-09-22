import { create } from "zustand";

// Utility function to parse the price with a comma format
const parsePrice = (priceString) => {
  const cleanedPrice = priceString
    .replace(/[^\d,.-]/g, "") // Remove non-numeric characters
    .replace(",", "."); // Convert comma to dot for decimal
  return parseFloat(cleanedPrice);
};

const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  clearCart: () => {
    set(() => {
      localStorage.setItem("cart", JSON.stringify([]));
      return { cart: [] };
    });
  },

  // Calculate the total price
  getCartTotal: () => {
    const cart = get().cart;
    return cart.reduce((sum, item) => {
      const price = parsePrice(item.salePrice); // Using the parsePrice function
      return sum + price * item.quantity;
    }, 0);
  },

  // Calculate the total number of items in the cart
  getCartItemsCount: () => {
    const cart = get().cart;
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Calculate the discount amount
  getDiscountAmount: () => {
    const cart = get().cart;
    return cart.reduce((totalDiscount, item) => {
      const originalPrice = parsePrice(item.originalPrice); // Using the parsePrice function
      const salePrice = parsePrice(item.salePrice);
      return totalDiscount + (originalPrice - salePrice) * item.quantity;
    }, 0);
  },

  // Calculate the reward bonus (e.g., 10% of sale price)
  getRewardBonus: () => {
    const cart = get().cart;
    return cart.reduce((totalBonus, item) => {
      const salePrice = parsePrice(item.salePrice);
      return totalBonus + salePrice * item.quantity * 0.1; // Example reward bonus
    }, 0);
  },
}));

export default useCartStore;
