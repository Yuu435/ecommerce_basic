export const CART = {
  ADD_ITEM: "cart/add",
  CHANGE_QUANTITY: "cart/change-quantity",
  REMOVE_ITEM: "cart/remove-item",
};

interface CartItem {
  product: {
    id: number;
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
}
interface CartAction {
  type: string;
  payload: any;
}

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CART.ADD_ITEM: {
      const isExist =
        state.items.findIndex(
          (item: CartItem) => item.product.id === action.payload.product.id
        ) !== -1;

      if (isExist) {
        return {
          ...state,
          items: state.items.map((item: CartItem) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    case CART.CHANGE_QUANTITY: {
      return {
        ...state,
        items: state.items.map((item: CartItem) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case CART.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(
          (item: CartItem) => item.product.id !== action.payload.id
        ),
      };
    }

    default: {
      return state;
    }
  }
};
