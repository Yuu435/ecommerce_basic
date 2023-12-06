import { useCart } from "../../hooks/useCart";
import CartItem from "./cart-item";
import "./cart-list.css";

interface itemType {
  id: number;
}
interface itemType {
  product: {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    discountPercentage: number;
    stock: number;
  };
  quantity: number;
}

export default function CartList() {
  const { items } = useCart();
  console.log(items);

  return (
    <div className="cart-list">
      {items.map((item: itemType) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
