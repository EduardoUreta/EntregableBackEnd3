import { ProductsManagerMongo } from "./productsManagerMongo.js";
import { CartsManagerMongo } from "./cartsManagerMongo.js";

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();

