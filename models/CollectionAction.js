const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    actionType: {
        type: String,
        required: [true, "Le type d'action est obligatoire"] // ex: 'appel', 'email'
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: String,
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CollectionAction', actionSchema);
