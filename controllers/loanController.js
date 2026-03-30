const Loan = require('../models/Loan');

// POST /api/loans/checkout
exports.checkoutBook = async (req, res, next) => {
  try {
    const { bookId, memberId } = req.body;
    if (!bookId || !memberId) {
      return res.status(400).json({ error: 'bookId and memberId are required' });
    }

    // Automatically set loan date and due date (14 days from now)
    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + 14);

    const loan = new Loan({ 
      bookId, 
      memberId, 
      loanDate,
      dueDate, 
      status: 'active' 
    });

    const savedLoan = await loan.save();
    res.status(201).json(savedLoan);
  } catch (error) {
    next(error);
  }
};

// PUT /api/loans/return/:loanId
exports.returnBook = async (req, res, next) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    
    // Check if book is already marked as returned
    if (loan.status === 'returned') {
      return res.status(400).json({ error: 'Book already returned' });
    }
    
    loan.returnDate = new Date();
    loan.status = 'returned';
    const updatedLoan = await loan.save();
    
    // Note: If you have a Book Service, call it here to increment available copies
    
    res.status(200).json(updatedLoan);
  } catch (error) {
    next(error);
  }
};

// GET /api/loans/member/:memberId
exports.getLoansByMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const loans = await Loan.find({ memberId }).sort({ loanDate: -1 });
    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
};

// GET /api/loans/overdue
exports.getOverdueLoans = async (req, res, next) => {
  try {
    const now = new Date();
    const overdueLoans = await Loan.find({
      status: { $in: ['active', 'overdue'] },
      dueDate: { $lt: now }
    });
    res.status(200).json(overdueLoans);
  } catch (error) {
    next(error);
  }
};

// GET /api/loans/:id
exports.getLoanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/loans/:id
exports.deleteLoan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndDelete(id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    next(error);
  }
};