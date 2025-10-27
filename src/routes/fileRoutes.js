/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File upload and handling APIs
 */

/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */




const express = require("express");
const router = express.Router();
const { upload, uploadImage } = require("../controllers/fileControllers");

router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
    