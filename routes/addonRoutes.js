const express = require('express');
const {
  registerAddon,
  getAllAddons,
  getById,
  getByBusinessId,
  updateAddon,
  deleteAddon,
} = require('../controllers/addonController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Addon:
 *       type: object
 *       required:
 *         - business_id
 *         - addon_name
 *         - addon_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the addon
 *         business_id:
 *           type: string
 *           description: The ID of the business the addon belongs to
 *         addon_name:
 *           type: string
 *           description: Name of the addon
 *         meal_category:
 *           type: string
 *           description: Category of the meal
 *         category:
 *           type: string
 *           description: The category of the addon
 *         addon_image:
 *           type: object
 *           properties:
 *             url1:
 *               type: string
 *               description: URL of the first addon image
 *             url2:
 *               type: string
 *               description: URL of the second addon image
 *         addon_price:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               description: Price of the addon
 *             currency:
 *               type: string
 *               description: Currency of the price
 *         addon_availability:
 *           type: boolean
 *           description: Availability of the addon
 *         addon_description:
 *           type: string
 *           description: Description of the addon
 *         preparation_time:
 *           type: number
 *           description: Preparation time of the addon
 *       example:
 *         business_id: 607c191e810c19729de860ea
 *         addon_name: Extra Cheese
 *         meal_category: Pizza
 *         category: Topping
 *         addon_image:
 *           url1: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/addons/cheese1.jpg
 *           url2: https://res.cloudinary.com/your_cloud_name/image/upload/v1614621000/addons/cheese2.jpg
 *         addon_price:
 *           price: 1.99
 *           currency: USD
 *         addon_availability: true
 *         addon_description: Add extra cheese to your pizza
 *         preparation_time: 1
 */

/**
 * @swagger
 * tags:
 *   name: Addons
 *   description: The addons managing API
 */

/**
 * @swagger
 * /api/addons:
 *   post:
 *     summary: Register a new addon
 *     tags: [Addons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Addon'
 *     responses:
 *       201:
 *         description: The addon was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Addon'
 *       400:
 *         description: Bad request
 */
router.post('/', registerAddon);

/**
 * @swagger
 * /api/addons:
 *   get:
 *     summary: Get all addons
 *     tags: [Addons]
 *     responses:
 *       200:
 *         description: A list of all addons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Addon'
 */
router.get('/', getAllAddons);

/**
 * @swagger
 * /api/addons/{id}:
 *   get:
 *     summary: Get an addon by ID
 *     tags: [Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the addon
 *     responses:
 *       200:
 *         description: The addon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Addon'
 *       404:
 *         description: Addon not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/addons/business/{business_id}:
 *   get:
 *     summary: Get all addons by business ID
 *     tags: [Addons]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID to filter addons
 *     responses:
 *       200:
 *         description: A list of addons for the specified business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Addon'
 */
router.get('/business/:business_id', getByBusinessId);

/**
 * @swagger
 * /api/addons/{id}:
 *   put:
 *     summary: Update an addon by ID
 *     tags: [Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the addon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Addon'
 *     responses:
 *       200:
 *         description: The updated addon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Addon'
 *       404:
 *         description: Addon not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', updateAddon);

/**
 * @swagger
 * /api/addons/{id}:
 *   delete:
 *     summary: Delete an addon by ID
 *     tags: [Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the addon
 *     responses:
 *       200:
 *         description: The addon was successfully deleted
 *       404:
 *         description: Addon not found
 */
router.delete('/:id', deleteAddon);

module.exports = router;
