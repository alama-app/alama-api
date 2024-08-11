const express = require('express');
const {
  registerFruit,
  getAllFruits,
  getById,
  getByBusinessId,
  updateFruit,
  deleteFruit,
} = require('../controllers/fruitController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Fruit:
 *       type: object
 *       required:
 *         - business_id
 *         - fruit_name
 *         - fruit_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the fruit
 *         business_id:
 *           type: string
 *           description: The ID of the business the fruit belongs to
 *         fruit_name:
 *           type: string
 *           description: Name of the fruit
 *         meal_category:
 *           type: string
 *           description: Category of the meal
 *         category:
 *           type: string
 *           description: The category of the fruit
 *         fruit_image:
 *           type: object
 *           properties:
 *             url1:
 *               type: string
 *               description: URL of the first fruit image
 *             url2:
 *               type: string
 *               description: URL of the second fruit image
 *         fruit_price:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               description: Price of the fruit
 *             currency:
 *               type: string
 *               description: Currency of the price
 *         fruit_availability:
 *           type: boolean
 *           description: Availability of the fruit
 *         fruit_description:
 *           type: string
 *           description: Description of the fruit
 *         preparation_time:
 *           type: number
 *           description: Preparation time of the fruit
 *       example:
 *         business_id: 607c191e810c19729de860ea
 *         fruit_name: Apple
 *         meal_category: Dessert
 *         category: Fruit
 *         fruit_image:
 *           url1: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/fruits/apple1.jpg
 *           url2: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/fruits/apple2.jpg
 *         fruit_price:
 *           price: 1.99
 *           currency: USD
 *         fruit_availability: true
 *         fruit_description: Fresh and juicy apples
 *         preparation_time: 2
 */

/**
 * @swagger
 * tags:
 *   name: Fruits
 *   description: The fruits managing API
 */

/**
 * @swagger
 * /api/fruits:
 *   post:
 *     summary: Register a new fruit
 *     tags: [Fruits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fruit'
 *     responses:
 *       201:
 *         description: The fruit was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fruit'
 *       400:
 *         description: Bad request
 */
router.post('/', registerFruit);

/**
 * @swagger
 * /api/fruits:
 *   get:
 *     summary: Get all fruits
 *     tags: [Fruits]
 *     responses:
 *       200:
 *         description: A list of all fruits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fruit'
 */
router.get('/', getAllFruits);

/**
 * @swagger
 * /api/fruits/{id}:
 *   get:
 *     summary: Get a fruit by ID
 *     tags: [Fruits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the fruit
 *     responses:
 *       200:
 *         description: The fruit details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fruit'
 *       404:
 *         description: Fruit not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/fruits/business/{business_id}:
 *   get:
 *     summary: Get all fruits by business ID
 *     tags: [Fruits]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID to filter fruits
 *     responses:
 *       200:
 *         description: A list of fruits for the specified business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fruit'
 */
router.get('/business/:business_id', getByBusinessId);

/**
 * @swagger
 * /api/fruits/{id}:
 *   put:
 *     summary: Update a fruit by ID
 *     tags: [Fruits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the fruit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fruit'
 *     responses:
 *       200:
 *         description: The updated fruit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fruit'
 *       404:
 *         description: Fruit not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', updateFruit);

/**
 * @swagger
 * /api/fruits/{id}:
 *   delete:
 *     summary: Delete a fruit by ID
 *     tags: [Fruits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the fruit
 *     responses:
 *       200:
 *         description: The fruit was successfully deleted
 *       404:
 *         description: Fruit not found
 */
router.delete('/:id', deleteFruit);

module.exports = router;
