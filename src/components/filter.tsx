import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import "./filter.css";
import { useSearchParams } from "react-router-dom";

interface FilterState {
  category: string;
}

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<FilterState>({
    category: searchParams.get("category") || "all",
  });

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get("https://dummyjson.com/products/categories")
        .then((res) => res.data),
  });
  console.log(categories);

  useEffect(() => {
    setSearchParams((prev) => {
      const newSearchParams: { [key: string]: string } = {};

      for (const [key, value] of prev.entries()) {
        newSearchParams[key] = value;
      }

      delete newSearchParams.page;

      if (filter.category == "all") delete newSearchParams.category;
      else newSearchParams.category = filter.category;

      return newSearchParams;
    });
  }, [filter]);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  return (
    <div className="filter">
      <div className="filter-heading">Filter by categories</div>

      {isLoading ? (
        <div>Loading categories data </div>
      ) : isError ? (
        <div>Fail loading categories data:{(error as Error).message}</div>
      ) : (
        <form>
          <div className="categories">
            {categories ? (
              categories.map((category: string) => (
                <div key={category} className="category">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    value={category}
                    checked={category == filter.category}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))
            ) : (
              <div>No categories available</div>
            )}
          </div>

          {filter.category != "all" ? (
            <button
              onClick={() =>
                setFilter((prev) => ({ ...prev, category: "all" }))
              }
            >
              Clear Filter
            </button>
          ) : null}
        </form>
      )}
    </div>
  );
}
