import { createContext, useReducer, ReactNode } from "react";
import { cartReducer } from "../reducers/cart-reducer";

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({});

const initialCartState = {
  items: [],
};

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}
