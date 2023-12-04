import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductList from "../components/product/product-list";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://dummyjson.com/products"),
  });

  const products = data?.data.products;

  return (
    <main>
      <h1>Home Page</h1>

      <div>
        {isLoading ? (
          <div>Loading Product data ...</div>
        ) : isError ? (
          <div>Fail to loading products data: {error.message}</div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </main>
  );
}
