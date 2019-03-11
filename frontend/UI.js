import EventService from './services/EventServices';
const eventService = new EventService();
import {
    format
} from 'timeago.js';
import {
    EventEmitter
} from 'events';

class UI {

    async renderEvents() {
        const events = await eventService.getEvents();
        const eventsCardContainer = document.getElementById('events-cards');
        eventsCardContainer.innerHTML = '';

        // Sort events from earliest creation date
        const sortEvents = (events) => {
            return events.sort((a, b) => {
                return new Date(b.created_on) - new Date(a.created_on);
            });
        }

        // Filter events from category selected
        var checkedCat = Array.from(document.querySelectorAll('input.category:checked'));
        var values = checkedCat.map(e => e.value);
        const filteredList = sortEvents(events).filter(e => {
            return values.indexOf(e.category) >= 0;
        });

        filteredList.forEach(element => {
            const div = document.createElement('div');
            let dts = new Date(element.start_date);
            let dte = new Date(element.end_date);
            div.className = '';
            div.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-3">${element.name}</h4>
                            <small>${format(element.created_on)}</small>
                        </div>
                        <div class="d-flex w-100 justify-content-between form-group">
                            <h6 class="card-subtitle mb-2 text-muted">${element.category}, ${element.event_delivery}</h6>
                        </div>
                        <div id="cdetails-${element._id}" style="display: none;">
                            <p>${element.place} (${element.address})</p>
                            <p>${dts.toString()}</p>
                            <p>${dte.toString()}</p>
                        </div>
                        <div class="card-controls">
                            <button type="button" class="btn btn-info details" id=${'details-' + element._id}>Mostrar</button>
                            <button type="button" class="btn btn-secondary edit" id=${element._id}>Editar</button>
                            <button type="button" class="btn btn-danger delete-event" id=${element._id}>Eliminar</button>
                        </div>
                    </div>
                </div>                
                `;
            eventsCardContainer.appendChild(div);
        });
    }

    createEvent() {
        const eventDetails = document.getElementById('newEventContainer');
        let btnNEvent = document.getElementById('create-event');
        let btnUEvent = document.getElementById('update-event');
        let btnSEvent = document.getElementById('save-event');
        let cardControls = document.getElementsByClassName('card-controls');
        const cTitle = eventDetails.querySelector('[class=card-header]');
        cTitle.innerHTML = 'Crear nuevo evento';
        if (eventDetails.style.display === 'none') {
            eventDetails.style.display = 'block';
            btnNEvent.style.display = 'none';
            btnUEvent.style.display = 'none';
            btnSEvent.style.display = 'block';
            for (var i = 0; i < cardControls.length; i++) {
                cardControls[i].style.display = 'none';
            }
        } else {
            eventDetails.style.display = 'none';
            btnNEvent.style.display = 'block';
            btnUEvent.style.display = 'block';
            btnSEvent.style.display = 'none';
            for (var i = 0; i < cardControls.length; i++) {
                cardControls[i].style.display = 'block';
            }
        }
    }

    async addEvent(event) {
        await eventService.postEvent(JSON.stringify(event));
        document.getElementById('event-form').reset();
        this.createEvent();
        this.renderEvents();
    }

    cancelEvent() {
        document.getElementById('event-form').reset();
        this.createEvent();
    }

    async editEvent(eventId) {
        const event = await eventService.getEventById(eventId);
        const eventDetails = document.getElementById('newEventContainer');
        let btnNEvent = document.getElementById('create-event');
        let btnSEvent = document.getElementById('save-event');
        let cardControls = document.getElementsByClassName('card-controls');
        if (eventDetails.style.display === 'none') {
            eventDetails.style.display = 'block';
            btnNEvent.style.display = 'none';
            btnSEvent.style.display = 'none';
            for (var i = 0; i < cardControls.length; i++) {
                cardControls[i].style.display = 'none';
            }
        } else {
            eventDetails.style.display = 'none';
            btnNEvent.style.display = 'block';
            btnSEvent.style.display = 'block';
            for (var i = 0; i < cardControls.length; i++) {
                cardControls[i].style.display = 'block';
            }
        }
        eventDetails.querySelector('[id=_id]').innerHTML = eventId;
        const cTitle = eventDetails.querySelector('[class=card-header]');
        const cName = eventDetails.querySelector('input[id=name]');
        const cCat = eventDetails.querySelector('select[id=category]');
        const cDel = eventDetails.querySelector('select[id=event_delivery]');
        const cPlace = eventDetails.querySelector('input[id=place]');
        const cAddress = eventDetails.querySelector('input[id=address]');
        const cDateSD = eventDetails.querySelector('input[id=start_date_day]');
        const cDateST = eventDetails.querySelector('input[id=start_date_time]');
        const cDateED = eventDetails.querySelector('input[id=end_date_day]');
        const cDateET = eventDetails.querySelector('input[id=end_date_time]');

        cTitle.innerHTML = 'Editar evento';
        cName.value = event[0].name;
        cCat.value = event[0].category;
        cDel.value = event[0].event_delivery;
        cPlace.value = event[0].place;
        cAddress.value = event[0].address;
        cDateSD.value = Array.from(event[0].start_date.split('T'))[0];
        cDateST.value = Array.from(event[0].start_date.split('T'))[1].split('.')[0];
        cDateED.value = Array.from(event[0].end_date.split('T'))[0];
        cDateET.value = Array.from(event[0].end_date.split('T'))[1].split('.')[0];
    }

    async updateEvent(event) {
        await eventService.putEvent(JSON.stringify(event));
        document.getElementById('event-form').reset();
        this.createEvent();
        this.renderEvents();
    }

    async deleteEvent(eventId) {
        await eventService.deleteEvent(eventId);
        this.renderEvents();
    }

    filterEvents() {
        this.renderEvents();
    }

    toggleDetails(eventId) {
        const eventDetails = document.getElementById('c' + eventId);
        let btnText = document.getElementById(eventId);
        if (eventDetails.style.display === 'none') {
            eventDetails.style.display = 'block';
            btnText.innerHTML = 'Ocultar';
        } else {
            eventDetails.style.display = 'none';
            btnText.innerHTML = 'Mostrar';
        }
    }
}

export default UI;