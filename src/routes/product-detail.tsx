import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import ReactStars from "react-stars";
import { roundPrice } from "../helpers/round-price";
import "./product-detail.css";
import { useCart } from "../hooks/useCart";
import { useState, ChangeEvent, FormEvent } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { onAdd } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`https://dummyjson.com/products/${id}`),
  });

  if (isLoading) {
    return <div>Loading product data ...</div>;
  }
  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return <div>Product not found</div>;
    } else {
      return <div>Fail to load product data: {error.message}</div>;
    }
  }

  const product = data?.data;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd({ product, quantity });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(+e.target.value);
  };

  return (
    <main>
      <div className="product-detail">
        <div className="product-images">
          <AwesomeSlider bullets={false}>
            {product.images.map((image: string) => (
              <div key={image} className="product-image">
                <img src={image} alt={product.title} />
              </div>
            ))}
          </AwesomeSlider>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-description">{product.description}</div>

          <div className="product-rating">
            <ReactStars value={product.rating} />
            <span className="rating-value">{product.rating}</span>
          </div>

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

          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="product-quantity">Quantity</label>
              <select
                className="product-quantity"
                value={quantity}
                onChange={handleChange}
              >
                {Array(product.stock)
                  .fill(null)
                  .map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
              </select>
            </div>

            <div className="form-field">
              <button className="button-add-to-cart">Add to cart</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
