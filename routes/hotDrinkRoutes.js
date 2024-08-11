const express = require('express');
const {
  registerHotDrink,
  getAllHotDrinks,
  getById,
  getByBusinessId,
  updateHotDrink,
  deleteHotDrink,
} = require('../controllers/hotDrinkController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     HotDrink:
 *       type: object
 *       required:
 *         - business_id
 *         - hotDrink_name
 *         - hotDrink_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the hot drink
 *         business_id:
 *           type: string
 *           description: The ID of the business the hot drink belongs to
 *         hotDrink_name:
 *           type: string
 *           description: Name of the hot drink
 *         meal_category:
 *           type: string
 *           description: Category of the meal
 *         category:
 *           type: string
 *           description: The category of the hot drink
 *         hotDrink_image:
 *           type: object
 *           properties:
 *             url1:
 *               type: string
 *               description: URL of the first hot drink image
 *             url2:
 *               type: string
 *               description: URL of the second hot drink image
 *         hotDrink_price:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               description: Price of the hot drink
 *             currency:
 *               type: string
 *               description: Currency of the price
 *         hotDrink_availability:
 *           type: boolean
 *           description: Availability of the hot drink
 *         hotDrink_description:
 *           type: string
 *           description: Description of the hot drink
 *         preparation_time:
 *           type: number
 *           description: Preparation time of the hot drink
 *       example:
 *         business_id: 607c191e810c19729de860ea
 *         hotDrink_name: Hot Chocolate
 *         meal_category: Beverage
 *         category: Drink
 *         hotDrink_image:
 *           url1: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/hotDrinks/chocolate1.jpg
 *           url2: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/hotDrinks/chocolate2.jpg
 *         hotDrink_price:
 *           price: 3.99
 *           currency: USD
 *         hotDrink_availability: true
 *         hotDrink_description: Rich and creamy hot chocolate
 *         preparation_time: 5
 */

/**
 * @swagger
 * tags:
 *   name: Hot Drinks
 *   description: The hot drinks managing API
 */

/**
 * @swagger
 * /api/hotDrinks:
 *   post:
 *     summary: Register a new hot drink
 *     tags: [Hot Drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HotDrink'
 *     responses:
 *       201:
 *         description: The hot drink was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotDrink'
 *       400:
 *         description: Bad request
 */
router.post('/', registerHotDrink);

/**
 * @swagger
 * /api/hotDrinks:
 *   get:
 *     summary: Get all hot drinks
 *     tags: [Hot Drinks]
 *     responses:
 *       200:
 *         description: A list of all hot drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HotDrink'
 */
router.get('/', getAllHotDrinks);

/**
 * @swagger
 * /api/hotDrinks/{id}:
 *   get:
 *     summary: Get a hot drink by ID
 *     tags: [Hot Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hot drink
 *     responses:
 *       200:
 *         description: The hot drink details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotDrink'
 *       404:
 *         description: Hot drink not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/hotDrinks/business/{business_id}:
 *   get:
 *     summary: Get all hot drinks by business ID
 *     tags: [Hot Drinks]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID to filter hot drinks
 *     responses:
 *       200:
 *         description: A list of hot drinks for the specified business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HotDrink'
 */
router.get('/business/:business_id', getByBusinessId);

/**
 * @swagger
 * /api/hotDrinks/{id}:
 *   put:
 *     summary: Update a hot drink by ID
 *     tags: [Hot Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hot drink
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HotDrink'
 *     responses:
 *       200:
 *         description: The updated hot drink
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotDrink'
 *       404:
 *         description: Hot drink not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', updateHotDrink);

/**
 * @swagger
 * /api/hotDrinks/{id}:
 *   delete:
 *     summary: Delete a hot drink by ID
 *     tags: [Hot Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hot drink
 *     responses:
 *       200:
 *         description: The hot drink was successfully deleted
 *       404:
 *         description: Hot drink not found
 */
router.delete('/:id', deleteHotDrink);

module.exports = router;
