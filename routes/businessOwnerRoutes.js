const express = require('express');
const {
    createBusinessOwner,
    getAllBusinessOwners,
    getBusinessOwnerById,
    updateBusinessOwner,
    deleteBusinessOwner,
    loginBusinessOwner
} = require('../controllers/businessOwnerController');
const hashPassword = require('../middlewares/hashPassword');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessOwner:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the business owner
 *         first_name:
 *           type: string
 *           description: First name of the business owner
 *         last_name:
 *           type: string
 *           description: Last name of the business owner
 *         email:
 *           type: string
 *           description: Email of the business owner
 *         phone:
 *           type: string
 *           description: Phone number of the business owner
 *         password:
 *           type: string
 *           description: Hashed password of the business owner
 *       example:
 *         first_name: John
 *         last_name: Doe
 *         email: john.doe@example.com
 *         phone: 1234567890
 *         password: password123
 */

/**
 * @swagger
 * tags:
 *   name: BusinessOwners
 *   description: The business owners managing API
 */

/**
 * @swagger
 * /api/business_owners:
 *   post:
 *     summary: Create a new business owner
 *     tags: [BusinessOwners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessOwner'
 *     responses:
 *       201:
 *         description: The business owner was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessOwner'
 *       400:
 *         description: Bad request
 */
router.post('/', hashPassword, createBusinessOwner);

/**
 * @swagger
 * /api/business_owners:
 *   get:
 *     summary: Returns the list of all the business owners
 *     tags: [BusinessOwners]
 *     responses:
 *       200:
 *         description: The list of business owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusinessOwner'
 */
router.get('/', getAllBusinessOwners);

/**
 * @swagger
 * /api/business_owners/{id}:
 *   get:
 *     summary: Get the business owner by id
 *     tags: [BusinessOwners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business owner id
 *     responses:
 *       200:
 *         description: The business owner description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessOwner'
 *       404:
 *         description: The business owner was not found
 */
router.get('/:id', getBusinessOwnerById);

/**
 * @swagger
 * /api/business_owners/{id}:
 *   put:
 *     summary: Update the business owner by id
 *     tags: [BusinessOwners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business owner id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessOwner'
 *     responses:
 *       200:
 *         description: The business owner was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessOwner'
 *       404:
 *         description: The business owner was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', hashPassword, updateBusinessOwner);

/**
 * @swagger
 * /api/business_owners/{id}:
 *   delete:
 *     summary: Remove the business owner by id
 *     tags: [BusinessOwners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business owner id
 *     responses:
 *       200:
 *         description: The business owner was deleted
 *       404:
 *         description: The business owner was not found
 */
router.delete('/:id', deleteBusinessOwner);

/**
 * @swagger
 * /api/business_owners/login:
 *   post:
 *     summary: Login a business owner
 *     tags: [BusinessOwners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated session
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: Business owner not found
 */
router.post('/login', loginBusinessOwner);

module.exports = router;
