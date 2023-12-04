import { useCart } from "../../hooks/useCart";
import CartItem from "./cart-item";
import "./cart-list.css"

export default function CartList() {
  const { items } = useCart();
  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
