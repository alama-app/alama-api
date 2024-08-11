const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const {
  registerFood,
  getAllFoods,
  getById,
  getByBusinessId,
  updateFood,
  deleteFood
} = require('../controllers/foodController');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food_images',
    allowed_formats: ['jpg', 'png']
  }
});

const upload = multer({ storage });

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - business_id
 *         - food_name
 *         - meal_category
 *         - category
 *         - food_image
 *         - food_price
 *         - food_availability
 *         - food_description
 *         - preparation_time
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the food item
 *         business_id:
 *           type: string
 *           description: ID of the business to which the food belongs
 *         food_name:
 *           type: string
 *           description: Name of the food item
 *         meal_category:
 *           type: string
 *           description: Meal category of the food item
 *         category:
 *           type: string
 *           description: Category of the food item
 *         food_image:
 *           type: object
 *           properties:
 *             url1:
 *               type: string
 *               description: URL of the first food image
 *             url2:
 *               type: string
 *               description: URL of the second food image
 *         food_price:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               description: Price of the food item
 *             currency:
 *               type: string
 *               description: Currency of the price
 *         food_availability:
 *           type: boolean
 *           description: Availability of the food item
 *         food_description:
 *           type: string
 *           description: Description of the food item
 *         preparation_time:
 *           type: number
 *           description: Preparation time of the food item (0-9)
 *       example:
 *         business_id: 60c72b2f9e8f8b30d8f1a8f9
 *         food_name: Pizza
 *         meal_category: Dinner
 *         category: Fast Food
 *         food_image: 
 *           url1: "http://example.com/image1.jpg"
 *           url2: "http://example.com/image2.jpg"
 *         food_price:
 *           price: 15.99
 *           currency: "USD"
 *         food_availability: true
 *         food_description: "Delicious cheese pizza"
 *         preparation_time: 5
 */

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: The foods managing API
 */

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Register a new food item
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: The food item was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       400:
 *         description: Bad request
 */
router.post('/', upload.fields([{ name: 'url1' }, { name: 'url2' }]), registerFood);

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Returns the list of all the food items
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: The list of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */
router.get('/', getAllFoods);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get the food item by id
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The food item id
 *     responses:
 *       200:
 *         description: The food item description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: The food item was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/foods/business/{business_id}:
 *   get:
 *     summary: Get the food items by business id
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business id
 *     responses:
 *       200:
 *         description: The list of food items for the business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       404:
 *         description: The business was not found
 */
router.get('/business/:business_id', getByBusinessId);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update the food item by id
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The food item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: The food item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: The food item was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', upload.fields([{ name: 'url1' }, { name: 'url2' }]), updateFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Remove the food item by id
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The food item id
 *     responses:
 *       200:
 *         description: The food item was deleted
 *       404:
 *         description: The food item was not found
 */
router.delete('/:id', deleteFood);

module.exports = router;
