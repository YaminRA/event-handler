const { Schema, model } = require('mongoose');

const EventSchema = new Schema(
    {
     name: { type: String, required: true },
     category: { type: String, required: true },
     place: { type: String, required: true },
     address: { type: String, required: true },
     start_date: { type: Date, required: true },
     end_date: { type: Date, required: true },
     event_delivery: { type: String, required: true },
     created_on: { type: Date, default: Date.now }
    }
);

module.exports = model('Event', EventSchema);