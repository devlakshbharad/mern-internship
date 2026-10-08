import { useState } from "react";
import axios from "axios";
import { api } from "../api/axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await api.post("/products", {
        name,
        price: Number(price),
        description,
        stock: Number(stock),
      });

      setMessage("Product added successfully!");

      setName("");
      setPrice("");
      setDescription("");
      setStock("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
            "Failed to add product"
        );
      } else {
        setError("Failed to add product");
      }
    }
  };

  return (
    <main>
      <h1>Add Product</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(event) =>
            setPrice(event.target.value)
          }
          min="0"
          required
        />

        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />

        <br />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(event) =>
            setStock(event.target.value)
          }
          min="0"
          required
        />

        <br />

        <button type="submit">
          Add Product
        </button>
      </form>
    </main>
  );
}