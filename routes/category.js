const router = require('express').Router();

const { create } = require('../controllers/category');

router.post('/category', create);

module.exports = router;

// SCHEMAS - SWAGGER

/**
 * @swagger
 * components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            trim: true
 *            minlength: 2
 *            maxlength: 32
 *          slug:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true
 *          status:
 *            type: string
 *            default: 'Active'
 *            enum:
 *              - Active
 *              - Inactive
 *        example:
 *          name: Fashion
 *          slug: fashion
 *          status: Active
 */