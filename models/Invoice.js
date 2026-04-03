const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    amount: {
        type: Number,
        required: [true, "Le montant est obligatoire"]
    },
    dueDate: {
        type: Date,
        required: [true, "La date d'échéance est obligatoire"]
    },
    status: {
        type: String,
        enum: ['impayée', 'payée', 'en retard'],
        default: 'impayée'
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
