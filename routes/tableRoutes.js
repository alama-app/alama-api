const express = require('express');
const {
  registerTable,
  getAllTables,
  updateTable,
  deleteTable,
  getTableById,
  getTablesByBusinessId
} = require('../controllers/tableController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: The tables managing API
 */

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Register a new table
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableNumber:
 *                 type: number
 *               status:
 *                 type: string
 *               capacity:
 *                 type: number
 *               business_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: The table was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 table:
 *                   $ref: '#/components/schemas/Table'
 *       400:
 *         description: Bad request
 */
router.post('/', registerTable);

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Get all tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: A list of all tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 */
router.get('/', getAllTables);

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Update a table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableNumber:
 *                 type: number
 *               status:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: The table was successfully updated
 *       404:
 *         description: Table not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', updateTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Delete a table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The table ID
 *     responses:
 *       200:
 *         description: The table was successfully deleted
 *       404:
 *         description: Table not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', deleteTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     summary: Get a table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The table ID
 *     responses:
 *       200:
 *         description: The table details
 *       404:
 *         description: Table not found
 *       400:
 *         description: Bad request
 */
router.get('/:id', getTableById);

/**
 * @swagger
 * /api/tables/business/{business_id}:
 *   get:
 *     summary: Get tables by business ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         required: true
 *         description: The business ID
 *     responses:
 *       200:
 *         description: The list of tables by business ID
 *       400:
 *         description: Bad request
 */
router.get('/business/:business_id', getTablesByBusinessId);

module.exports = router;
