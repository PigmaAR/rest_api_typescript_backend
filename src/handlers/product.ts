import { Request, Response } from "express";
import Product from "../models/Product.model";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: products });
  } catch (e) {
    console.log(e);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.json({ data: product });
  } catch (e) {
    console.log(e);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (e) {
    console.log(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (e) {
    console.log(e);
  }
}

export async function updateAvailability(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    await product.destroy();

    res.json({ data: "Producto eliminado" });
  } catch (e) {
    console.log(e);
  }
}
