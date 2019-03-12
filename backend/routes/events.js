const { Router } = require('express');
const router = Router();
const Event = require('../models/event');

router.get('/', async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

router.get('/:id', async (req, res) => {
    const events = await Event.find({"_id": req.params.id});
    res.send(events);
});

router.post('/', async (req, res) => {
    const {
        name,
        category,
        event_delivery,
        place,
        address,
        start_date,
        end_date
    } = req.body;
    const newEvent = new Event({
        name,
        category,
        event_delivery,
        place,
        address,
        start_date,
        end_date,
    });
    await newEvent.save();
    res.send('Event created');
});

router.put('/:id', async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id,{$set: req.body})
    res.send('Event updated');
});

router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.send('Event deleted');
});

module.exports = router;