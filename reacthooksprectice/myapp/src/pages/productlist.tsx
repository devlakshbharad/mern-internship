import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useFetch } from "../hooks/usefetch";
import { useDebounce } from "../hooks/usedebounce";
import type { Product } from "../types/product";
import { useTheme } from "../context/themecontext";
import ProductCard from "../components/productcard";

const API_URL =
  "https://fakestoreapi.com/products";

export default function ProductList() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_URL);

  const [search, setSearch] = useState("");

  const debouncedSearch =
    useDebounce(search, 300);

  const searchRef =
    useRef<HTMLInputElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredProducts =
    products?.filter((product) =>
      product.title
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
    ) ?? [];

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "20px",
        background:
          theme === "light"
            ? "#ffffff"
            : "#111111",
        color:
          theme === "light"
            ? "#111111"
            : "#ffffff",
      }}
    >
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
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}