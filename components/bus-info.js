import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@latest/+esm';

class BusInfo extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 15px;
        }
        .title {
            font-weight: bold;
            font-size: 1.2em;
        }
    `;

    static properties = {
        nextBus: { type: String }
    };

    constructor() {
        super();
        this.nextBus = "Chargement...";
        this.fetchBusSchedule();
    }

    async fetchBusSchedule() {
        // A voir si tu gardes du coup...
        const url = "" 
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.nextBus = `Prochain passage: ${data.next}`;
        } catch (error) {
            console.error("Error fetching bus data:", error);
            this.nextBus = "Données non disponibles";
        }
    }

    render() {
        return html`
            <div class="title">🚌 EN BUS</div>
            <p>PROCHAINS PASSAGES DU BUS CAMPUS ARTEM</p>
            <p>${this.nextBus}</p>
        `;
    }
}

customElements.define('bus-info', BusInfo);
