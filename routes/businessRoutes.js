const express = require('express');
const {
    createBusiness,
    getAllBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness
} = require('../controllers/businessController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       required:
 *         - business_owner_id
 *         - business_name
 *         - business_category
 *         - number_of_employees
 *         - logo
 *         - license
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the business
 *         business_owner_id:
 *           type: string
 *           description: ID of the business owner
 *         business_name:
 *           type: string
 *           description: Name of the business
 *         business_category:
 *           type: string
 *           description: Category of the business
 *         number_of_employees:
 *           type: number
 *           description: Number of employees in the business
 *         logo:
 *           type: string
 *           description: URL of the business logo
 *         license:
 *           type: string
 *           description: URL of the business license
 *         location:
 *           type: string
 *           description: Location of the business (latitude and longitude)
 *       example:
 *         business_owner_id: "60d5ec49f4867c1a2c85b2e8"
 *         business_name: "Tech Solutions"
 *         business_category: "IT Services"
 *         number_of_employees: 50
 *         logo: "https://example.com/logo.png"
 *         license: "https://example.com/license.png"
 *         location: "34.0522 N, 118.2437 W"
 */

/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: The businesses managing API
 */

/**
 * @swagger
 * /api/businesses:
 *   post:
 *     summary: Create a new business
 *     tags: [Businesses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       201:
 *         description: The business was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       400:
 *         description: Bad request
 */
router.post('/', createBusiness);

/**
 * @swagger
 * /api/businesses:
 *   get:
 *     summary: Returns the list of all the businesses
 *     tags: [Businesses]
 *     responses:
 *       200:
 *         description: The list of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 */
router.get('/', getAllBusinesses);

/**
 * @swagger
 * /api/businesses/{id}:
 *   get:
 *     summary: Get the business by business_owner_id
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: business_owner_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business owner id
 *     responses:
 *       200:
 *         description: The business description by business_owner_id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: The business was not found
 */
router.get('/:id', getBusinessById);

/**
 * @swagger
 * /api/businesses/{id}:
 *   put:
 *     summary: Update the business by id
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: The business was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: The business was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', updateBusiness);

/**
 * @swagger
 * /api/businesses/{id}:
 *   delete:
 *     summary: Remove the business by id
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *     responses:
 *       200:
 *         description: The business was deleted
 *       404:
 *         description: The business was not found
 */
router.delete('/:id', deleteBusiness);

module.exports = router;
