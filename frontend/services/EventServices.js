class EventService {
    constructor() {
        this.URI = '/api/events';
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
        const eventId = JSON.parse(event)._id;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${this.URI}/${eventId}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.parse(event));
        console.log(event);
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