import React from "react";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard = React.memo(
  function ProductCard({
    product,
  }: ProductCardProps) {
    console.log(
      "ProductCard rendered:",
      product.title
    );

    return (
      <article
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "15px 0",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          width="150"
        />

        <h2>{product.title}</h2>

        <p>${product.price}</p>

        <p>{product.category}</p>
      </article>
    );
  }
);

export default ProductCard;