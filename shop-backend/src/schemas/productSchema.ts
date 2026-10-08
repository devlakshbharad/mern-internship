import { z } from "zod";

// POST /products
export const productBodySchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string().nullable().optional(),

  price: z.number().positive(
    "Price must be greater than 0"
  ),

  stock: z.number().int().nonnegative(
    "Stock cannot be negative"
  ),
});

// GET /products
export const productQuerySchema = z.object({
  search: z.string().optional(),

  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(50)
    .default(10),
});

// /products/:id
export const productIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive(),
});