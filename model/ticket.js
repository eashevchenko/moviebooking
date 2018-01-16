const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'hall'
    },
    user: {
      type: Schema.Types.ObjectId,
        ref: 'user'
    },
    orderId: String
});

const Ticket = mongoose.model('ticket', ticketSchema, 'tickets');
module.exports = Ticket;
