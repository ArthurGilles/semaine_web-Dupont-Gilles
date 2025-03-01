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

        .weather-container {
            display: flex;
            align-items: center;
            background-color: #ffca37;
            border-radius: 50px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

            margin-bottom: 5px;
        }

        .weather-left {
            margin: 10px;
        }

        .weather-icon {
            width: 50px;
            height: 50px;
        }

        .weather-right {
            display: flex;
            flex-direction: column;

            color: white;
            margin-right: 10px;
        }

        .weather-right-label {
            margin: 10px 0 5px 0;
            font-size: 14px;
        }

        .weather-right-forecast {
            margin: 0 0 10px 0;
            font-size: 18px;
        }

        .weather-source {
            color: rgba(0, 0, 0, 0.5);
            font-size: 12px;
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
            <p>Météo sur le <strong>Campus ARTEM</strong></p>
            <div class="weather-container">
            ${this.loading
                ? html`<p>Chargement...</p>`
                : html`
                    <div class="weather-left">
                        <img class="weather-icon" src="${this.icon}" alt="Météo">
                    </div>
                    <div class="weather-right">
                        <p class="weather-right-label">À cette heure,</p>
                        <p class="weather-right-forecast"><strong>${this.temperature}°C</strong> - ${this.description}</p>
                    </div>
                `}
            </div>
            <a href="https://openweathermap.org" class="weather-source">OpenWeather</a>
        `;
    }
}

customElements.define('weather-info', WeatherInfo);
