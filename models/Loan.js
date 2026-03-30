const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  memberId: {
    type: String,
    required: true
  },
  loanDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'returned', 'overdue'],
    default: 'active'
  }
}, { timestamps: true });

// Pre-save hook to calculate dueDate and update overdue status
loanSchema.pre('validate', function(next) {
  if (this.isNew && !this.dueDate) {
    const due = new Date(this.loanDate || Date.now());
    due.setDate(due.getDate() + 14);
    this.dueDate = due;
  }
  
  if (this.status === 'active' && this.dueDate < new Date()) {
    this.status = 'overdue';
  }
  next();
});

module.exports = mongoose.model('Loan', loanSchema);
