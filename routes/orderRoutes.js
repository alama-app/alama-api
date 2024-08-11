const express = require('express');
const {
    placeOrder,
    getAllByBusinessId,
    getByBusinessIdForToday,
    getByBusinessIdAndStaffId
} = require('../controllers/orderController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - business_id
 *         - customer_name
 *         - table_number
 *         - order_items
 *         - total_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         business_id:
 *           type: string
 *           description: The id of the business
 *         staff_id:
 *           type: string
 *           description: The id of the staff (nullable)
 *         customer_name:
 *           type: string
 *           description: The name of the customer
 *         table_number:
 *           type: string
 *           description: The table number where the order is placed
 *         order_note:
 *           type: string
 *           description: Additional notes for the order
 *         order_items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The id of the item
 *               category_id:
 *                 type: string
 *                 description: The id of the category
 *               category:
 *                 type: string
 *                 description: The name of the category (e.g., foods, addons)
 *         total_price:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               description: The total price of the order
 *             currency:
 *               type: string
 *               description: The currency of the price (default is TZS)
 *         order_status:
 *           type: string
 *           description: The status of the order (default is pending)
 *         payment_status:
 *           type: string
 *           description: The payment status of the order (default is 'Not Paid')
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time when the order was placed
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API to manage orders
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully placed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 */
router.post('/', placeOrder);

/**
 * @swagger
 * /api/orders/business/{business_id}:
 *   get:
 *     summary: Get all orders by business id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the business
 *     responses:
 *       200:
 *         description: A list of orders for the business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 */
router.get('/business/:business_id', getAllByBusinessId);

/**
 * @swagger
 * /api/orders/business/{business_id}/today:
 *   get:
 *     summary: Get all orders for today by business id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the business
 *     responses:
 *       200:
 *         description: A list of today's orders for the business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 */
router.get('/business/:business_id/today', getByBusinessIdForToday);

/**
 * @swagger
 * /api/orders/business/{business_id}/staff/{staff_id}:
 *   get:
 *     summary: Get all orders by business id and staff id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the business
 *       - in: path
 *         name: staff_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the staff
 *     responses:
 *       200:
 *         description: A list of orders for the business and staff
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 */
router.get('/business/:business_id/staff/:staff_id', getByBusinessIdAndStaffId);

module.exports = router;
