import ReactStars from "react-stars";
import { roundPrice } from "../../helpers/round-price";
import "./product-cart.css";
import { Link } from "react-router-dom";

interface ProductProp {
  product: {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    discountPercentage: number;
    stock: number;
    rating: number;
  };
}

export default function ProductCart({ product }: ProductProp) {
  return (
    <Link className="product-link" to={`/products/${product.id}`}>
      <div className="product-cart">
        <div className="product-thumbnail">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">
            <span className="sale-price">
              $
              {roundPrice(
                product.price -
                  (product.price * product.discountPercentage) / 100
              )}
            </span>
            <span className="origin-price">${product.price}</span>
          </div>

          <div className="product-rating">
            <ReactStars
              count={product.rating}
              size={13}
              color2={"#ffd700"}
              edit={false}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
