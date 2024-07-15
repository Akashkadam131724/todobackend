/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Operations related to countries
 */

import express from "express";
import {
  createCountry,
  createMultipleCountries,
  getAllCountry,
  getCountryById,
  updateCountry,
  deleteCountryById,
  deleteAllCountries,
} from "../controllers/country/country.js";

import {
  searchCountry,
  suggestCountryName,
} from "../controllers/country/search-filter.js";

const router = express.Router();

/**
 * @swagger
 * /country:
 *   post:
 *     summary: Create a new country
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               country_code:
 *                 type: string
 *               capital:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Created country object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 country_code:
 *                   type: string
 *                 capital:
 *                   type: string
 *       '400':
 *         description: Bad request or validation error
 */
router.post("/", createCountry);

/**
 * @swagger
 * /country/createmultiple:
 *   post:
 *     summary: Create multiple countries
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 country_code:
 *                   type: string
 *                 capital:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Array of created country objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   country_code:
 *                     type: string
 *                   capital:
 *                     type: string
 *       '400':
 *         description: Bad request or validation error
 */
router.post("/createmultiple", createMultipleCountries);

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     tags: [Country]
 *     responses:
 *       '200':
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   country_code:
 *                     type: string
 *                   capital:
 *                     type: string
 */
router.get("/", getAllCountry);

/**
 * @swagger
 * /country/search:
 *   get:
 *     summary: Search countries
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Country name for search
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Country description for search
 *       - in: query
 *         name: country_code
 *         schema:
 *           type: string
 *         description: Country code for search
 *       - in: query
 *         name: capital
 *         schema:
 *           type: string
 *         description: Country capital for search
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         enum: [name, description, country_code, capital]
 *         default: name
 *         description: Field to sort by
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         enum: [asc, desc]
 *         default: asc
 *         description: Sort order ('asc' or 'desc')
 *     responses:
 *       '200':
 *         description: List of countries matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 countries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       country_code:
 *                         type: string
 *                       capital:
 *                         type: string
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalCountries:
 *                   type: integer
 */
router.get("/search", searchCountry);

/**
 * @swagger
 * /country/suggest:
 *   get:
 *     summary: Suggest country names
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Partial name of the country to suggest
 *     responses:
 *       '200':
 *         description: List of suggested country names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/suggest", suggestCountryName);

/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Get a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country ID
 *     responses:
 *       '200':
 *         description: Country object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 country_code:
 *                   type: string
 *                 capital:
 *                   type: string
 *       '404':
 *         description: Country not found
 */
router.get("/:id", getCountryById);

/**
 * @swagger
 * /country/{id}:
 *   put:
 *     summary: Update a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               country_code:
 *                 type: string
 *               capital:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated country object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 country_code:
 *                   type: string
 *                 capital:
 *                   type: string
 *       '400':
 *         description: Bad request or validation error
 *       '404':
 *         description: Country not found
 */
router.put("/:id", updateCountry);

/**
 * @swagger
 * /country/{id}:
 *   delete:
 *     summary: Delete a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country ID
 *     responses:
 *       '200':
 *         description: Country deleted successfully
 *       '404':
 *         description: Country not found
 */
router.delete("/:id", deleteCountryById);

/**
 * @swagger
 * /country:
 *   delete:
 *     summary: Delete all countries
 *     tags: [Country]
 *     responses:
 *       '200':
 *         description: All countries deleted successfully
 */
router.delete("/", deleteAllCountries);

export default router;
