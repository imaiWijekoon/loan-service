const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - bookId
 *         - memberId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the loan
 *         bookId:
 *           type: string
 *           description: The ID of the book
 *         memberId:
 *           type: string
 *           description: The ID of the member
 *         loanDate:
 *           type: string
 *           format: date-time
 *           description: The date the loan was created
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The date the loan is due
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: The date the loan was returned
 *         status:
 *           type: string
 *           enum: [active, returned, overdue]
 *           description: The status of the loan
 */

/**
 * @swagger
 * /api/loans/checkout:
 *   post:
 *     summary: Create a new loan (checkout a book)
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - memberId
 *             properties:
 *               bookId:
 *                 type: string
 *               memberId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The loan was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/checkout', loanController.checkoutBook);

/**
 * @swagger
 * /api/loans/return/{loanId}:
 *   put:
 *     summary: Mark a loan as returned
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: loanId
 *         required: true
 *         schema:
 *           type: string
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: The loan was marked as returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Bad request (i.e. already returned)
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */
router.put('/return/:loanId', loanController.returnBook);

/**
 * @swagger
 * /api/loans/member/{memberId}:
 *   get:
 *     summary: Get all loans for a specific member
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The member ID
 *     responses:
 *       200:
 *         description: List of loans for the member
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Server error
 */
router.get('/member/:memberId', loanController.getLoansByMember);

/**
 * @swagger
 * /api/loans/overdue:
 *   get:
 *     summary: Get all overdue loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of overdue loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Server error
 */
router.get('/overdue', loanController.getOverdueLoans);

/**
 * @swagger
 * /api/loans/{id}:
 *   get:
 *     summary: Get a single loan by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: The loan details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */
router.get('/:id', loanController.getLoanById);

/**
 * @swagger
 * /api/loans/{id}:
 *   delete:
 *     summary: Delete a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Loan deleted successfully
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
