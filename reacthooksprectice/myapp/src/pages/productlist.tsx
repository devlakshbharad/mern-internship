import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";
import { useDebounce } from "../hooks/usedebounce";
import type { Product } from "../types/product";
import { useTheme } from "../context/themecontext";
import ProductCard from "../components/productcard";
import { api } from "../api/axios";

interface ProductsResponse {
  data: Product[];
  page: number;
  limit: number;
  total: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6;

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch =
    useDebounce(search, 300);

  const searchRef =
    useRef<HTMLInputElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await api.get<ProductsResponse>(
            "/products",
            {
              params: {
                search: debouncedSearch,
                page,
                limit,
              },
            }
          );

        setProducts(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ??
              "Failed to load products"
          );
        } else {
          setError(
            "Failed to load products"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    void getProducts();
  }, [debouncedSearch, page]);

  const totalPages =
    Math.ceil(total / limit);

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

      {loading && (
        <h2>Loading products...</h2>
      )}

      {error && (
        <h2>Error: {error}</h2>
      )}

      {!loading && !error && (
        <>
          <div>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            )}
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                setPage((current) =>
                  current - 1
                )
              }
              disabled={page === 1}
            >
              Previous
            </button>

            <span
              style={{
                margin: "0 15px",
              }}
            >
              Page {page} of{" "}
              {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setPage((current) =>
                  current + 1
                )
              }
              disabled={
                page >= totalPages ||
                totalPages === 0
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}