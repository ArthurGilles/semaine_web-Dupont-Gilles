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
        
        .info-wrapper {
            display: flex;
            
            margin-top: 15px;
            margin-bottom: 15px;
        }
        
        .info-wrapper img {
            width: 100px;
        }
        
        .info-right-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            margin-left: 15px;
            margin-right: 15px;
            
            text-align: left;
            font-size: 18px;
        }

        .bike-container {
            display: flex;
            align-items: center;
            background-color: #a6d27f;
            border-radius: 50px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }

        .progress-circle {
            position: relative;
            width: 60px;
            height: 60px;
            margin: 15px;
        }

        svg {
            transform: rotate(-90deg);
        }

        .circle-bg {
            fill: none;
            stroke: #dfe8c5;
            stroke-width: 6;
        }

        .circle-progress {
            fill: none;
            stroke: #ffffff;
            stroke-width: 6;
            stroke-linecap: round;
            stroke-dasharray: 157;
            stroke-dashoffset: 157;
            transition: stroke-dashoffset 0.5s ease-out;
        }

        .bike-emoji {
            position: absolute;
            top: -3px;
            left: 21px;
        }

        .bike-info {
            display: flex;
            flex-direction: column;
            
            color: white;
            font-size: 16px;
            margin-right: 10px;
        }
        
        .bike-info p {
            margin: 0;
        }
        
        .bike-info-label {
            margin-bottom: 3px;
            font-size: 14px;
        }

        .bike-info strong {
            font-size: 24px;
        }
    `;

    static properties = {
        bikesAvailable: { type: Number },
        totalBikes: { type: Number }
    };

    constructor() {
        super();
        this.bikesAvailable = 0;
        this.totalBikes = 30;
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
            this.totalBikes = data.mainStands.availabilities.stands;
        } catch (error) {
            console.error("Error fetching bike data:", error);
        }
    }

    get dashOffset() {
        const percentage = this.bikesAvailable / this.totalBikes;
        const circumference = 2 * Math.PI * 25;
        return circumference * (1 - percentage);
    }

    render() {
        return html`
            <div class="title">🚲 À VÉLO</div>
            <div class="info-wrapper">
                <img src="img/logo_velostan.png" alt="Logo vélOstan' lib">
                <div class="info-right-wrapper">
                    <a href="https://www.velostanlib.fr/fr/home">VélOstan' lib</a>
                    <p>Vélos en location libre-service</p>
                </div>
            </div>
            <p>Station <strong>Campus ARTEM</strong></p>
            <div class="bike-container">
                <div class="progress-circle" title="${this.bikesAvailable} sur ${this.totalBikes}">
                    <svg width="60" height="60">
                        <circle class="circle-bg" cx="30" cy="30" r="25"></circle>
                        <circle class="circle-progress" cx="30" cy="30" r="25" style="stroke-dashoffset: ${this.dashOffset};"></circle>
                    </svg>
                    <p class="bike-emoji">🚲</p>
                </div>
                <div class="bike-info">
                    <p class="bike-info-label">À cette heure,</p>
                    <p><strong>${this.bikesAvailable}</strong> VÉLOS DISPONIBLES</p>
                </div>
            </div>
        `;
    }
}

customElements.define('bike-info', BikeInfo);
