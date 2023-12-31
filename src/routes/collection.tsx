import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/product/product-list";
import ReactPaginate from "react-paginate";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import "./collection.css";
import Filter from "../components/filter";

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page: any = searchParams.get("page") || 1;
  const limit: any = searchParams.get("limit") || 12;
  const category = searchParams.get("category");

  const { isPending, isError, error, data } = useQuery({
    queryKey: category
      ? ["category", { category, page, limit }]
      : ["products", { page, limit }],
    queryFn: () =>
      axios.get(
        category
          ? `https://dummyjson.com/products/category/${category}`
          : `https://dummyjson.com/products`,
        {
          params: { skip: (page - 1) * limit, limit },
        }
      ),
    placeholderData: keepPreviousData,
  });

  const products = data?.data.products;

  const handlePageClick = (e: { selected: any }) => {
    setSearchParams((prev) => {
      const newSearchParams: { [key: string]: string } = {};

      for (const [key, value] of prev.entries()) {
        newSearchParams[key] = value;
      }

      if (e.selected == 0) delete newSearchParams["page"];
      else newSearchParams["page"] = e.selected + 1;

      return newSearchParams;
    });
  };

  const totalPage = Math.ceil((data?.data.total || 0) / limit);

  return (
    <main>
      <h1>Collection Page</h1>

      {isPending ? (
        <div>Loading products</div>
      ) : isError ? (
        <div>Fail loading products data: {error?.message}</div>
      ) : (
        <div className="collection">
          <div className="collection-filter">
            <Filter />
          </div>

          <div className="collection-products">
            <ProductList products={products} />
            <ReactPaginate
              className="paginate"
              breakLabel="..."
              nextLabel={<BsChevronDoubleRight />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={totalPage}
              previousLabel={<BsChevronDoubleLeft />}
              renderOnZeroPageCount={null}
              forcePage={page - 1}
              pageClassName="paginate-item"
            />
          </div>
        </div>
      )}
    </main>
  );
}
