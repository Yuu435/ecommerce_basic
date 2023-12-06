import ProductCart from "./product-cart";
import "./product-list.css";

interface ProductProp {
  products: [
    product: {
      id: number;
      title: string;
      thumbnail: string;
      price: number;
      discountPercentage: number;
      stock: number;
      rating: number;
    }
  ];
}

export default function ProductList({ products }: ProductProp) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
}
