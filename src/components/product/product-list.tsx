import ProductCart from "./product-cart";
import "./product-list.css";

export default function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
}
