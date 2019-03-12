const { Router } = require('express');
const router = Router();
const Event = require('../models/event');
const uEvent = require('../models/uEvent');

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
    console.log(newEvent);
    res.send('Event created');
});

router.put('/:id', async (req, res) => {
    const {
        id,
        name,
        category,
        event_delivery,
        place,
        address,
        start_date,
        end_date
    } = req.body;
    const updateEvent = new uEvent({
        id,
        name,
        category,
        event_delivery,
        place,
        address,
        start_date,
        end_date,
    });
    await updateEvent.updateOne();
    console.log(updateEvent);
    res.send(updateEvent);
});

router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.send('Event deleted');
});

module.exports = router;