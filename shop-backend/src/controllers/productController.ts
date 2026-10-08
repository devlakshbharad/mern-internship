import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../repositories/productRepository";

import {
  productBodySchema,
  productQuerySchema,
  productIdSchema,
} from "../schemas/productSchema";

// GET /products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate query parameters
    const query = productQuerySchema.parse(req.query);

    // Get products from repository
    const result = await findAll(query);

    res.status(200).json({
      data: result.data,
      page: query.page,
      limit: query.limit,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
};

// GET /products/:id
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate ID
    const { id } = productIdSchema.parse(req.params);

    // Find product
    const product = await findById(id);

    // Product doesn't exist
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });

      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const body = productBodySchema.parse(req.body);

    // Create product
    const product = await create(
      body.name,
      body.description ?? null,
      body.price,
      body.stock
    );

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// PUT /products/:id
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate ID
    const { id } = productIdSchema.parse(req.params);

    // Validate body
    const body = productBodySchema.parse(req.body);

    // Update product
    const product = await update(
      id,
      body.name,
      body.description ?? null,
      body.price,
      body.stock
    );

    // Product doesn't exist
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });

      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE /products/:id
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate ID
    const { id } = productIdSchema.parse(req.params);

    // Delete product
    const product = await remove(id);

    // Product doesn't exist
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};