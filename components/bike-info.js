import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@latest/+esm';

class BikeInfo extends LitElement {
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
        bikesAvailable: { type: Number }
    };

    constructor() {
        super();
        this.bikesAvailable = 0;
        this.fetchBikeData();
    }

    async fetchBikeData() {
        const apiKey = '653e90747c8120cbefc9d6b754b33bfe533ffa73'; 
        const contractName = 'nancy';
        const url = `https://api.jcdecaux.com/vls/v3/stations/31?contract=${contractName}&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.bikesAvailable = data.mainStands.availabilities.bikes;
        } catch (error) {
            console.error("Error fetching bike data:", error);
        }
    }

    render() {
        return html`
            <div class="title">🚲 À VÉLO</div>
            <p>Vélos en location libre-service</p>
            <p><strong>Campus ARTEM</strong></p>
            <p>À cette heure, <strong>${this.bikesAvailable} VÉLOS DISPONIBLES</strong></p>
        `;
    }
}

customElements.define('bike-info', BikeInfo);
