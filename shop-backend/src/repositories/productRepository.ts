import { pool } from "../db";

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  created_at: Date;
}

export interface ProductQuery {
  search?: string;
  page: number;
  limit: number;
}

export const findAll = async (
  query: ProductQuery
): Promise<{ data: Product[]; total: number }> => {
  const { search, page, limit } = query;

  const offset = (page - 1) * limit;

  const searchValue = search
    ? `%${search}%`
    : null;

  const dataResult = await pool.query<Product>(
    `SELECT id, name, description, price, stock, created_at
     FROM products
     WHERE ($1::text IS NULL OR name ILIKE $1)
     ORDER BY id ASC
     LIMIT $2 OFFSET $3`,
    [searchValue, limit, offset]
  );

  const countResult = await pool.query<{ count: string }>(
    `SELECT COUNT(*) AS count
     FROM products
     WHERE ($1::text IS NULL OR name ILIKE $1)`,
    [searchValue]
  );

  return {
    data: dataResult.rows,
    total: Number(countResult.rows[0].count),
  };
};

export const findById = async (
  id: number
): Promise<Product | null> => {
  const result = await pool.query<Product>(
    `SELECT id, name, description, price, stock, created_at
     FROM products
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};

export const create = async (
  name: string,
  description: string | null,
  price: number,
  stock: number
): Promise<Product> => {
  const result = await pool.query<Product>(
    `INSERT INTO products
     (name, description, price, stock)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, description, price, stock, created_at`,
    [name, description, price, stock]
  );

  return result.rows[0];
};

export const update = async (
  id: number,
  name: string,
  description: string | null,
  price: number,
  stock: number
): Promise<Product | null> => {
  const result = await pool.query<Product>(
    `UPDATE products
     SET name = $1,
         description = $2,
         price = $3,
         stock = $4
     WHERE id = $5
     RETURNING id, name, description, price, stock, created_at`,
    [name, description, price, stock, id]
  );

  return result.rows[0] ?? null;
};

export const remove = async (
  id: number
): Promise<Product | null> => {
  const result = await pool.query<Product>(
    `DELETE FROM products
     WHERE id = $1
     RETURNING id, name, description, price, stock, created_at`,
    [id]
  );

  return result.rows[0] ?? null;
};