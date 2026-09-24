import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import type { Product } from "../types/product";

const API_URL = "https://fakestoreapi.com/products";

export default function ProductList() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_URL);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredProducts =
    products?.filter((product) =>
      product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    ) ?? [];

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>Product List</h1>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              width="150"
            />

            <h2>{product.title}</h2>

            <p>${product.price}</p>

            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}