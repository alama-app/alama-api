const express = require('express');
const {
  registerSoftDrink,
  getAllSoftDrinks,
  getById,
  getByBusinessId,
  updateSoftDrink,
  deleteSoftDrink,
} = require('../controllers/softDrinkController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SoftDrink:
 *       type: object
 *       required:
 *         - business_id
 *         - softDrink_name
 *         - softDrink_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the soft drink
 *         business_id:
 *           type: string
 *           description: The ID of the business the soft drink belongs to
 *         softDrink_name:
 *           type: string
 *           description: Name of the soft drink
 *         meal_category:
 *           type: string
 *           description: Category of the meal
 *         category:
 *           type: string
 *           description: The category of the soft drink
 *         softDrink_image:
 *           type: object
 *           properties:
 *             url1:
 *               type: string
 *               description: URL of the first soft drink image
 *             url2:
 *               type: string
 *               description: URL of the second soft drink image
 *         softDrink_price:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               description: Price of the soft drink
 *             currency:
 *               type: string
 *               description: Currency of the price
 *         softDrink_availability:
 *           type: boolean
 *           description: Availability of the soft drink
 *         softDrink_description:
 *           type: string
 *           description: Description of the soft drink
 *         preparation_time:
 *           type: number
 *           description: Preparation time of the soft drink
 *       example:
 *         business_id: 607c191e810c19729de860ea
 *         softDrink_name: Cola
 *         meal_category: Beverage
 *         category: Drink
 *         softDrink_image:
 *           url1: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/softDrinks/cola1.jpg
 *           url2: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/softDrinks/cola2.jpg
 *         softDrink_price:
 *           price: 1.99
 *           currency: USD
 *         softDrink_availability: true
 *         softDrink_description: Refreshing cola drink
 *         preparation_time: 2
 */

/**
 * @swagger
 * tags:
 *   name: Soft Drinks
 *   description: The soft drinks managing API
 */

/**
 * @swagger
 * /api/softDrinks:
 *   post:
 *     summary: Register a new soft drink
 *     tags: [Soft Drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SoftDrink'
 *     responses:
 *       201:
 *         description: The soft drink was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SoftDrink'
 *       400:
 *         description: Bad request
 */
router.post('/', registerSoftDrink);

/**
 * @swagger
 * /api/softDrinks:
 *   get:
 *     summary: Get all soft drinks
 *     tags: [Soft Drinks]
 *     responses:
 *       200:
 *         description: A list of all soft drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SoftDrink'
 */
router.get('/', getAllSoftDrinks);

/**
 * @swagger
 * /api/softDrinks/{id}:
 *   get:
 *     summary: Get a soft drink by ID
 *     tags: [Soft Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the soft drink
 *     responses:
 *       200:
 *         description: The soft drink details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SoftDrink'
 *       404:
 *         description: Soft drink not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/softDrinks/business/{business_id}:
 *   get:
 *     summary: Get all soft drinks by business ID
 *     tags: [Soft Drinks]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID to filter soft drinks
 *     responses:
 *       200:
 *         description: A list of soft drinks for the specified business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SoftDrink'
 */
router.get('/business/:business_id', getByBusinessId);

/**
 * @swagger
 * /api/softDrinks/{id}:
 *   put:
 *     summary: Update a soft drink by ID
 *     tags: [Soft Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the soft drink
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SoftDrink'
 *     responses:
 *       200:
 *         description: The updated soft drink
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SoftDrink'
 *       404:
 *         description: Soft drink not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', updateSoftDrink);

/**
 * @swagger
 * /api/softDrinks/{id}:
 *   delete:
 *     summary: Delete a soft drink by ID
 *     tags: [Soft Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the soft drink
 *     responses:
 *       200:
 *         description: The soft drink was successfully deleted
 *       404:
 *         description: Soft drink not found
 */
router.delete('/:id', deleteSoftDrink);

module.exports = router;
