class EventService {
    constructor() {
        this.URI = 'http://localhost:3000/api/events';
    }

    async getEvents() {
        const res = await fetch(this.URI);
        const events = await res.json();
        return events;
    }

    async getEventById(eventId) {
        const res = await fetch(`${this.URI}/${eventId}`);
        const event = await res.json();
        return event;
    }

    postEvent(event) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.URI);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(event);
    }

    putEvent(event) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${this.URI}/${event._id}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(event));
    }

    async deleteEvent(eventId) {
        const res = await fetch(`${this.URI}/${eventId}`, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        });
    }
}
export default EventService;