const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); 

const {
    registerStaff,
    staffLogin,
    getStaffByBusinessId,
    getStaffByNameAndBusinessId,
    getStaffById
} = require('../controllers/staffController');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'staff_images',
        allowed_formats: ['jpg', 'png']
    }
});

const upload = multer({ storage });

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - business_owner_id
 *         - business_id
 *         - staff_name
 *         - staff_designation
 *         - staff_code
 *         - staff_category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the staff
 *         business_owner_id:
 *           type: string
 *           description: ID of the business owner
 *         business_id:
 *           type: string
 *           description: ID of the business
 *         staff_name:
 *           type: string
 *           description: Name of the staff
 *         staff_designation:
 *           type: string
 *           description: Designation of the staff
 *         staff_code:
 *           type: string
 *           description: Code of the staff
 *         staff_category:
 *           type: string
 *           description: Category of the staff
 *         email:
 *           type: string
 *           description: Email of the staff
 *         phone:
 *           type: string
 *           description: Phone number of the staff
 *         staff_image:
 *           type: string
 *           description: URL of the staff image
 *       example:
 *         business_owner_id: "60d5ec49f4867c1a2c85b2e8"
 *         business_id: "60d5ec49f4867c1a2c85b2e9"
 *         staff_name: "Jane Doe"
 *         staff_designation: "Manager"
 *         staff_code: "STF123"
 *         staff_category: "Admin"
 *         email: "jane.doe@example.com"
 *         phone: "+1 (108) 648-4654"
 *         staff_image: "http://example.com/image.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Staffs
 *   description: The staffs managing API
 */

/**
 * @swagger
 * /api/staffs:
 *   post:
 *     summary: Register a new staff
 *     tags: [Staffs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               business_owner_id:
 *                 type: string
 *               business_id:
 *                 type: string
 *               staff_name:
 *                 type: string
 *               staff_designation:
 *                 type: string
 *               staff_code:
 *                 type: string
 *               staff_category:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The staff was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Bad request
 */
router.post('/', upload.single('image'), registerStaff);

/**
 * @swagger
 * /api/staffs/login:
 *   post:
 *     summary: Staff login
 *     tags: [Staffs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               staff_code:
 *                 type: string
 *                 description: Code of the staff
 *               staff_category:
 *                 type: string
 *                 description: Category of the staff
 *             example:
 *               staff_code: "STF123"
 *               staff_category: "Admin"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request
 */
router.post('/login', staffLogin);

/**
 * @swagger
 * /api/staffs/business/{business_id}:
 *   get:
 *     summary: Get staffs by business ID
 *     tags: [Staffs]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID
 *     responses:
 *       200:
 *         description: The list of staffs by business ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Bad request
 */
router.get('/business/:business_id', getStaffByBusinessId);

/**
 * @swagger
 * /api/staffs/search:
 *   get:
 *     summary: Get staffs by name and business ID
 *     tags: [Staffs]
 *     parameters:
 *       - in: query
 *         name: staff_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the staff
 *       - in: query
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID
 *     responses:
 *       200:
 *         description: The list of staffs by name and business ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Bad request
 */
router.get('/search', getStaffByNameAndBusinessId);

/**
 * @swagger
 * /api/staffs/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: The staff details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Bad request
 */
router.get('/:id', getStaffById);

module.exports = router;
