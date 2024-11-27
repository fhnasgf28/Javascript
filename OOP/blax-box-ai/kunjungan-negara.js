class Travel {
    constructor(destination, duration, budget) {
        this.destination = destination;
        this.duration = duration;
        this.budget = budget;
    }

    getInfo() {
        return `Destination: ${this.destination}, Duration: ${this.duration}, Budget: ${this.budget}`
    }
}

class Country extends Travel {
    constructor(destination, duration, budget, language, currency) {
        super(destination, duration, budget);
        this.language = language;
        this.currency = currency;
    }

    getCountryInfo() {
        const travelInfo = this.getInfo();
        return `${travelInfo}, Language: ${this.language}, Currency: ${this.currency}`
    }
}

// contoh penggunaan

const tripToJapan = new Country("Japan", 10, 1000, "Japanese");
console.log(tripToJapan.getCountryInfo());