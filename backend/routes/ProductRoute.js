import express from "express";
import asyncHandler from "express-async-handler";
import logger from "../logger/devLogger.js";
import Product from "../models/ProductModel.js";
import {authenticate, authenticateAdmin} from "../Middleware/HandleAuth.js";

const productRoute = express.Router();

// get all products
productRoute.get(
    "/",
    asyncHandler(async (req, res) => {
        logger.http(`GET /api/products was called`);
        const products = await Product.find({});
        if (!products) {
            logger.error(`GET /api/products: No products found`);
            res.status(404);
            throw new Error("No products found");
        } else {
            const totalProducts = products.length;
            res.json({
                message: `Success! ${totalProducts} products were found`,
                numberOfProducts: totalProducts,
                products,
            });
        }
    })
);

// get a single product by slug
productRoute.get(
    "/slug/:slug",
    asyncHandler(async (req, res) => {
        logger.http(`GET /api/products/slug/${req.params.id} was called`);
        console.log(req.params);

        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        } else {
            res.json(product);
        }
    })
);

// get a single product by id
productRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
        logger.http(`GET /api/products/${req.params.id} was called`);
        console.log(req.params);

        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        } else {
            res.json(product);
        }
    })
);

// get all products by main category
// the four main categories are:
// keyboards,mice,headphones, and accessories
productRoute.get(
    "/category/:category",
    asyncHandler(async (req, res) => {
        logger.http(`GET /api/products/category/${req.params.category} was called`);
        const products = await Product.find({mainCategory: req.params.category});
        if (!products) {
            logger.error(`GET /api/products/category/${req.params.category}: No products found`);
            res.status(404);
            throw new Error(`No products were found under ${req.params.category}`);
        } else {
            const totalProducts = products.length;
            res.json({
                message: `Success! ${totalProducts} products were found`,
                numberOfProducts: totalProducts,
                products,
            });
        }
    })
);

/**
 * get all products by main category and sub category
 * the diff types of sub categories are:
 * keyboards:
 *  for keybaords you can search for inidividuals like only mech or only membrane or wired or wirelss
 *  but also can specify the sub-subcategory like mech_wireless
 *   - mech_wired
 *   - mech_wireless
 *   - membrane_wired
 *   - membrane_wireless
 * mice:
 *  - wired
 *  - wireless
 * headphones:
 *  - wired
 *  - wireless
 * accessories:
 *  - wristWrest
 *  - mousePad
 *  - deskMats
 *  - keyCaps
 *
 * */
productRoute.get(
    "/category/:category/:subcategory",
    asyncHandler(async (req, res) => {
        logger.http(`GET /api/products/category/${req.params.category}/${req.params.subcategory} was called`);
        const subcategory = req.params.subcategory;
        const products = await Product.find({
            mainCategory: req.params.category,
            subCategory: {'$regex': `${subcategory}`, '$options': 'i'}
        });
        logger.debug('products: ', products);
        if (products.length === 0) {
            logger.error(`GET /api/products/category/${req.params.category}/${req.params.subcategory}: No products found`);
            res.status(404);
            throw new Error(`No products were found under ${req.params.category}/${req.params.subcategory}`);
        } else {
            const totalProducts = products.length;
            res.json({
                message: `Success! ${totalProducts} products were found`,
                numberOfProducts: totalProducts,
                products,
            });
        }
    })
);



// post product review
productRoute.post(
    "/:slug/review",
    authenticate,
    asyncHandler(async (req, res) => {
        logger.http(`GET /api/products/${req.params.id} was called`);
        const { rating, comment } = req.body;
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        } else {
            const hasAlreadyReviewed = product.reviews.some(
                (review) => review.user.toString() === req.user._id.toString()
            );
            if (hasAlreadyReviewed) {
                res.status(400);
                throw new Error("You have already reviewed this product");
            } else {
                product.reviews.push({
                    name: req.user.name,
                    user: req.user._id,
                    rating: Number(rating),
                    comment,
                });
                product.numberOfReviews += product.reviews.length;
                product.rating =
                    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
                    product.reviews.length;
                await product.save();
                res.status(201).json({ message: "Review was added", product });
            }
        }
    })
);


//Admin Only: delete product
productRoute.delete(
    "/:id",
    authenticate,
    authenticateAdmin,
    asyncHandler(async (req, res) => {
        logger.http(`DELETE /api/products/${req.params.id} was called`);
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        } else {
            await product.remove();
            res.status(200).json({ message: "Product was deleted", product });
        }
    })
);

//Admin Only: Add product
productRoute.post(
    "/",
    authenticate,
    authenticateAdmin,
    asyncHandler(async (req, res) => {
        logger.http(`POST /api/products was called to create a new product`);
        // check for body to not be empty
        logger.http(`req.body: ${JSON.stringify(req.body)}`);
        if (Object.keys(req.body).length === 0) {
            logger.http(`POST /api/products: req.body is empty`);
            res.status(400);
            throw new Error("Request body is missing");
        } else {
            const {
                name,
                vendor,
                price,
                description,
                image,
                mainCategory,
                subCategory,
                inStock,
                rating,
                numberOfReviews,
            } = req.body;
            const productExists = await Product.findOne({ name });
            if (productExists) {
                res.status(400);
                throw new Error("Product already exists");
            } else {
                const product = new Product({
                    name,
                    slug: slugify(name),
                    vendor,
                    price,
                    description,
                    image,
                    mainCategory,
                    subCategory,
                    inStock,
                    rating,
                    numberOfReviews,
                });
                if (!product) {
                    res.status(400);
                    throw new Error("Invalid data");
                } else {
                    const newProduct = await product.save();
                    res.status(201).json({ message: "Product was added", newProduct });
                }
            }
        }
    })
);

//Admin Only: Edit product
productRoute.put(
    "/:id",
    authenticate,
    authenticateAdmin,
    asyncHandler(async (req, res) => {
        logger.http(`POST /api/products was called to create a new product`);
        // check for body to not be empty
        logger.http(`req.body: ${JSON.stringify(req.body)}`);
        if (Object.keys(req.body).length === 0) {
            logger.http(`POST /api/products: req.body is empty`);
            res.status(400);
            throw new Error("Request body is missing");
        } else {
            logger.debug(`req.params: ${JSON.stringify(req.params)}`);
            const product = await Product.findById(req.params.id);
            logger.debug(`product: ${JSON.stringify(product)}`);
            if (product) {
                // check the name is unique
                if (req.body.name && req.body.name !== product.name) {
                    logger.debug(`req.body.name: ${req.body.name}`);
                    const isNameTaken = await Product.findOne({ name: req.body.name });
                    if (isNameTaken) {
                        res.status(400);
                        throw new Error("Product name is already taken");
                    } else {
                        product.name = req.body.name;
                        product.slug = slugify(req.body.name);
                    }
                }
                product.vendor = req.body.vendor || product.vendor;
                product.price = req.body.price || product.price;
                product.description = req.body.description || product.description;
                product.image = req.body.image || product.image;
                product.mainCategory = req.body.mainCategory || product.mainCategory;
                product.subCategory = req.body.subCategory || product.subCategory;
                product.inStock = req.body.inStock || product.inStock;
                product.rating = req.body.rating || product.rating;
                product.numberOfReviews =
                    req.body.numberOfReviews || product.numberOfReviews;

                const updatedProduct = await product.save();
                if (!updatedProduct) {
                    res.status(400);
                    throw new Error("Invalid data");
                } else {
                    res.json({ message: "Product was updated", updatedProduct });
                }
            } else {
                res.status(404);
                throw new Error("Product not found");
            }
        }
    })
);

export default productRoute;
