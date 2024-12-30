import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *       Products:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product Name
 *                  example: Monitor Curvo de 49 Pulgadas
 *              price:
 *                  type: number
 *                  description: The Product Price
 *                  example: 399.99
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *               - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Products"
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *               - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Products"
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors as any,
  getProductById,
);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *               - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399.99
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Products"
 *              400:
 *                  description: Bad Request - Invalid input data
 */
router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío"),
  handleInputErrors as any,
  createProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *               - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399.99
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Products"
 *              404:
 *                  description: Product Not Found
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors as any,
  updateProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates product availability
 *          tags:
 *               - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Products"
 *              404:
 *                  description: Product Not Found
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors as any,
  updateAvailability,
);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product
 *          tags:
 *               - Products
 *          description: Delete a product by its ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Products"
 *              404:
 *                  description: Product Not Found
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors as any,
  deleteProduct,
);

export default router;
