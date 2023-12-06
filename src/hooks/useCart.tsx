import { useContext } from "react";
import { CartContext } from "../providers/cart-provider";
import { CART } from "../reducers/cart-reducer";
import { toast } from "react-toastify";

export const useCart = () => {
  const [state, dispatch] = useContext(CartContext);

  const addToCart = ({
    product,
    quantity = 1,
  }: {
    product: any;
    quantity?: number;
  }) => {
    dispatch({ type: CART.ADD_ITEM, payload: { product, quantity } });
    toast.success("Add to cart success");
  };

  const changeQuantity = ({
    id,
    quantity,
  }: {
    id: number;
    quantity?: number;
  }) => {
    dispatch({ type: CART.CHANGE_QUANTITY, payload: { id, quantity } });
  };

  const removeItem = ({ id }: { id: number }) => {
    dispatch({ type: CART.REMOVE_ITEM, payload: { id } });
  };

  const totalItem = state.items.length;
  const totalPrice = state.items.reduce((total: number, item: any) => {
    total += item.quantity * item.product.price;

    return total;
  }, 0);

  const totalDiscount = state.items.reduce((total: number, item: any) => {
    total +=
      ((item.product.price * item.product.discountPercentage) / 100) *
      item.quantity;
    return total;
  }, 0);

  return {
    ...state,
    totalItem,
    totalPrice,
    totalDiscount,
    onAdd: addToCart,
    onChange: changeQuantity,
    onRemove: removeItem,
  };
};
