import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@latest/+esm';

class WeatherInfo extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 15px;
        }
        .title {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
        .weather-icon {
            width: 50px;
            height: 50px;
        }
    `;

    static properties = {
        temperature: { type: Number },
        description: { type: String },
        icon: { type: String },
        loading: { type: Boolean }
    };

    constructor() {
        super();
        this.temperature = null;
        this.description = "Chargement...";
        this.icon = "";
        this.loading = true;
        this.fetchWeather();
    }

    async fetchWeather() {
        const apiKey = '8a721d1f40392527a0e4b38c94574459'; 
        const city = 'Nancy,fr';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=fr`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erreur de requête");
            const data = await response.json();

            this.temperature = Math.round(data.main.temp);
            this.description = data.weather[0].description;
            this.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            this.loading = false;
        } catch (error) {
            console.error("Erreur lors de la récupération des données météo:", error);
            this.description = "Données non disponibles";
            this.loading = false;
        }
    }

    render() {
        return html`
            <div class="title">🚶‍♂️ À PIED</div>
            <p>MÉTÉO CAMPUS ARTEM</p>
            ${this.loading
                ? html`<p>Chargement...</p>`
                : html`
                    <p><strong>${this.temperature}°C</strong></p>
                    <p>${this.description}</p>
                    <img class="weather-icon" src="${this.icon}" alt="Météo">
                `}
        `;
    }
}

customElements.define('weather-info', WeatherInfo);
