const resultsDiv = document.getElementById('results');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('back-btn');


const cerca = async () => {
    try {
        const searchInput = document.getElementById('search-input').value;
        const catSearch =  document.getElementById('category').value;
        const response = await fetch(`https://swapi.py4e.com/api/${catSearch}/?search=${searchInput}`);
        const data = await response.json();
        
        displayResults(data.results, catSearch);
    } catch (error) {
        console.error('Non trovato', error);
    }
}

const fetchData = async (category, page = 1) => {
    try {
        const response = await fetch(`https://swapi.py4e.com/api/${category}/?page=${page}`);
        const data = await response.json();    

        displayResults(data.results, category);   
        // Se sono presenti pagine successive o precedenti abilita la proprietà onclick dei rispettivi tasti
        nextBtn.onclick = (data.next) ? () => fetchData(category, page + 1) : null;
        prevBtn.onclick = (data.previous) ? () => fetchData(category, page - 1) : null;
    } catch (error) {
        console.error('Errore nel recuperare i dati:', error);
    }
}

const displayResults = (results, category) => {
    resultsDiv.innerHTML = ''; // Pulisce il contenuto precedente
    
    // Utilizzare un operatore ternario per decidere quale funzione di visualizzazione chiamare
    (category === 'films') ? displayFilms(results) :
    (category === 'people') ? displayPeople(results) :
    (category === 'planets') ? displayPlanets(results) :
    (category === 'species') ? displaySpecies(results) :
    (category === 'starships') ? displayStarships(results) :
    (category === 'vehicles') ? displayVehicles(results) :
    console.error('Categoria non gestita:', category);
}


const displayFilms = (films) => {
    films.forEach(film => {
        const { title, release_date, director } = film;
        const resultElement = document.createElement('div');
        resultElement.classList.add("scheda");
        resultElement.innerHTML = `<h4>${title}</h4>
                                   <p>Release Date: ${release_date}</p>
                                   <p>Director: ${director}</p>`;
        resultsDiv.appendChild(resultElement);
    });
}

const displayPeople = (people) => {
    people.forEach(person => {
        const { name, height, mass, gender } = person;
        const resultElement = document.createElement('div');
        resultElement.classList.add("scheda");
        resultElement.innerHTML = `<h4>${name}</h4>
                                   <p>Height: ${height}</p>
                                   <p>Mass: ${mass}</p>
                                   <p>Gender: ${gender}</p>`;
        resultsDiv.appendChild(resultElement);
    });
}

const displayPlanets = (planets) => {
    planets.forEach(planet => {
        const { name, gravity, terrain, population } = planet;
        const resultElement = document.createElement('div');
        resultElement.classList.add("scheda");
        resultElement.innerHTML = `<h4>${name}</h4>
                                   <p>Gravity: ${gravity}</p>
                                   <p>Terrain type: ${terrain}</p>
                                   <p>Population: ${population}</p>`;
        resultsDiv.appendChild(resultElement);
    });
}


const displaySpecies = (species) => {
    species.forEach(specie => {
        const { name, classification, designation, average_height } = specie;
        const resultElement = document.createElement('div');
        resultElement.classList.add("scheda");
        resultElement.innerHTML = `<h4>${name}</h4>
                                   <p>Classification: ${classification}</p>
                                   <p>Designation: ${designation}</p>
                                   <p>Average Height: ${average_height}</p>`;
        resultsDiv.appendChild(resultElement);
    });
}

const displayStarships = (starships) => {
    starships.forEach(starship => {
        const { model, manufacturer, cost_in_credits, max_atmosphering_speed,  } = starship;
        const resultElement = document.createElement('div');
        resultElement.classList.add("scheda");
        resultElement.innerHTML = `<h4>${model}</h4>
                                   <p>Manufacturer: ${manufacturer}</p>
                                   <p>Cost in Credits: ${cost_in_credits}</p>
                                   <p>Speed: ${max_atmosphering_speed}</p>`;
        resultsDiv.appendChild(resultElement);
    });
}

const displayVehicles = (vehicles) => {
    vehicles.forEach(vehicles => {
        const { name, model, cost_in_credits, vehicle_class } = vehicles;
        const resultElement = document.createElement('div');
        resultElement.classList.add("scheda");
        resultElement.innerHTML = `<h4>${name}</h4>
                                   <p>Model: ${model}</p>
                                   <p>Cost in Credits: ${cost_in_credits}</p>
                                   <p>Vehicle Class: ${vehicle_class}</p>`;
        resultsDiv.appendChild(resultElement);
    })
}
