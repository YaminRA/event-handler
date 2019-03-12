import './styles/styles.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderEvents();
});

document.getElementById('create-event').addEventListener('click', e => {
    const ui = new UI();
    ui.createEvent();
    e.preventDefault();
});

document.getElementById('cancel-event').addEventListener('click', e => {
    const ui = new UI();
    ui.cancelEvent();
    e.preventDefault();
});

document.getElementById('event-form').addEventListener('submit', e => {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const place = document.getElementById('place').value;
    const address = document.getElementById('address').value;
    const start_date_day = document.getElementById('start_date_day').value;
    const start_date_time = document.getElementById('start_date_time').value;
    const start_date = start_date_day.concat('T', start_date_time);
    const end_date_day = document.getElementById('end_date_day').value;
    const end_date_time = document.getElementById('end_date_time').value;
    const end_date = end_date_day.concat('T', end_date_time);
    const event_delivery = document.getElementById('event_delivery').value;

    const formData = {
        "name": name,
        "category": category,
        "place": place,
        "address": address,
        "start_date": start_date,
        "end_date": end_date,
        "event_delivery": event_delivery
    };

    const ui = new UI();
    console.log(formData);
    ui.addEvent(formData);
    e.preventDefault();
});

document.getElementById('categories').addEventListener('click', e => {
    if (e.target.classList.contains('filter-events')) {
        const ui = new UI();
        ui.filterEvents();
        e.preventDefault();
    }
});

document.getElementById('events-cards').addEventListener('click', e => {
    if (e.target.classList.contains('details')) {
        let eventId = e.target.getAttribute('id');
        const ui = new UI();
        ui.toggleDetails(eventId);
    }
    e.preventDefault();
});

document.getElementById('events-cards').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const eventId = e.target.getAttribute('id');
        const ui = new UI();
        ui.editEvent(eventId);
    }
    e.preventDefault();
});

document.getElementById('update-event').addEventListener('click', e => {
    const id = document.getElementById('_id').innerHTML;
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const place = document.getElementById('place').value;
    const address = document.getElementById('address').value;
    const start_date_day = document.getElementById('start_date_day').value;
    const start_date_time = document.getElementById('start_date_time').value;
    const start_date = start_date_day.concat('T', start_date_time);
    const end_date_day = document.getElementById('end_date_day').value;
    const end_date_time = document.getElementById('end_date_time').value;
    const end_date = end_date_day.concat('T', end_date_time);
    const event_delivery = document.getElementById('event_delivery').value;

    const formData = {
        "_id": id,
        "name": name,
        "category": category,
        "place": place,
        "address": address,
        "start_date": start_date,
        "end_date": end_date,
        "event_delivery": event_delivery
    };

    const ui = new UI();
    ui.updateEvent(formData);
    e.preventDefault();
});

document.getElementById('events-cards').addEventListener('click', e => {
    if (e.target.classList.contains('delete-event')) {
        let eventId = e.target.getAttribute('id');
        const ui = new UI();
        ui.deleteEvent(eventId);
        e.preventDefault();
    }
});