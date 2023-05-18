const locations = "https://rickandmortyapi.com/api/location";
const ApiUrl = "https://rickandmortyapi.com/api";
const episodesList = document.getElementById("episodesList");
const containerCards = document.getElementById("containerCards");
const prevResidentsButton = document.getElementById("prevResidentsButton");
const nextResidentsButton = document.getElementById("nextResidentsButton");
const loadMoreEpisodesButton = document.getElementById(
	"loadMoreEpisodesButton"
);
const loadPlanetsButton = document.getElementById("loadPlanetsButton");
const topLocationBtn = document.getElementById("topLocationBtn");
const loadTopEpisodesBtn = document.getElementById("loadTopEpisodesBtn");
const topCharactersBtn = document.getElementById("topCharactersBtn");
const loadMoreCardsButton = document.getElementById("loadMoreCardsButton");
let isLocationsSection = false;
let episodesPage = 1;
let charactersPage = 0;
let locatiosPage = 1;
let resultsPage = 1;
let displayedCharacters = [];
let charactersLoaded = 0;
const residentsPerPage = 20;

function loadEpisodes() {
	fetch(`${ApiUrl}/episode?page=${episodesPage}`)
		.then((response) => response.json())
		.then((data) => {
			data.results.forEach((episode) => {
				const li = document.createElement("li");
				li.classList.add("nav-item");
				const link = document.createElement("a");
				link.classList.add("nav-link");
				link.href = "#";
				link.textContent = `${episode.id} - Name: ${episode.name} - Air date: ${episode.air_date} Number episode: ${episode.episode}`;
				link.addEventListener("click", () => {
					containerCards.innerHTML = "";
					charactersPage = 1;
					currentEpisode = episode;
					episode.characters.forEach((characterUrl) => {
						if (charactersPage > 8) return; // Change this number to the maximum number of characters per page you want to display
						fetch(characterUrl)
							.then((response) => response.json())
							.then((data) => {
								const div = document.createElement("div");
								div.classList.add("col");
								const card = document.createElement("div");
								card.classList.add(
									"card",
									"mb-3",
									"card.shadow-sm"
								);
								const img = document.createElement("img");
								img.src = data.image;
								img.classList.add("card-img-top");
								const cardBody = document.createElement("div");
								cardBody.classList.add("card-body");
								const title = document.createElement("h5");
								title.classList.add("card-title");
								title.textContent = data.name;
								const status = document.createElement("p");
								const species = document.createElement("p");
								species.classList.add("card-text");
								species.textContent = `Specie: ${data.species}`;
								const gender = document.createElement("p");
								gender.classList.add("card-text");
								gender.textContent = `Gender: ${data.gender}`;
								status.classList.add("card-text");
								status.textContent = `Status: ${data.status}`;
								cardBody.appendChild(title);
								cardBody.appendChild(species);
								cardBody.appendChild(status);
								cardBody.appendChild(gender);
								card.appendChild(img);
								card.appendChild(cardBody);
								div.appendChild(card);
								containerCards.appendChild(div);
							});
						charactersPage++;
					});
					if (episode.characters.length > 8) {
						loadMoreCardsButton.classList.remove("d-none");
					} else {
						loadMoreCardsButton.classList.add("d-none");
					}
				});
				li.appendChild(link);
				episodesList.appendChild(li);
			});
			if (data.info.next) {
				loadMoreEpisodesButton.classList.remove("d-none");
			} else {
				loadMoreEpisodesButton.classList.add("d-none");
			}
			loadPlanetsButton.classList.add("d-none");
			nextResidentsButton.add("d-none");
		});
}

loadEpisodes();
loadMoreEpisodesButton.addEventListener("click", () => {
	episodesPage++;
	loadEpisodes();
});

function loadMoreCards() {
	const charactersPerPage = 8;
	const remainingCharacters =
		currentEpisode.characters.length - charactersLoaded;
	const charactersToLoad = Math.min(charactersPerPage, remainingCharacters);

	currentEpisode.characters
		.slice(charactersLoaded, charactersLoaded + charactersToLoad)
		.forEach((characterUrl) => {
			fetch(characterUrl)
				.then((response) => response.json())
				.then((data) => {
					const div = document.createElement("div");
					div.classList.add("col");
					const card = document.createElement("div");
					card.classList.add("card", "mb-3");
					const img = document.createElement("img");
					img.src = data.image;
					img.classList.add("card-img-top");
					const cardBody = document.createElement("div");
					cardBody.classList.add("card-body");
					const title = document.createElement("h5");
					title.classList.add("card-title");
					title.textContent = data.name;
					const status = document.createElement("p");
					const species = document.createElement("p");
					species.classList.add("card-text");
					species.textContent = `Specie: ${data.species}`;
					const gender = document.createElement("p");
					gender.classList.add("card-text");
					gender.textContent = `Gender: ${data.gender}`;
					status.classList.add("card-text");
					status.textContent = `Status: ${data.status}`;
					cardBody.appendChild(title);
					cardBody.appendChild(species);
					cardBody.appendChild(status);
					cardBody.appendChild(gender);
					card.appendChild(img);
					card.appendChild(cardBody);
					div.appendChild(card);
					containerCards.appendChild(div);

					displayedCharacters.push(data);
				});
		});

	charactersLoaded += charactersToLoad;

	if (charactersLoaded >= currentEpisode.characters.length) {
		loadMoreCardsButton.classList.add("d-none");
	}
}
loadMoreCardsButton.addEventListener("click", loadMoreCards);
function loadCharacters() {
	fetch(`${ApiUrl}/character`)
		.then((response) => response.json())
		.then((data) => {
			containerCards.innerHTML = "";

			data.results.forEach((character) => {
				// Crear tarjeta de personaje
				const div = document.createElement("div");
				div.classList.add("col");
				const card = document.createElement("div");
				card.classList.add("card", "mb-3", "card.shadow-sm");
				const img = document.createElement("img");
				img.src = character.image;
				img.classList.add("card-img-top");
				const cardBody = document.createElement("div");
				cardBody.classList.add("card-body");
				const title = document.createElement("h5");
				title.classList.add("card-title");
				title.textContent = character.name;
				const status = document.createElement("p");
				status.classList.add("card-text");
				status.textContent = `Status: ${character.status}`;
				const gender = document.createElement("p");
				gender.classList.add("card-text");
				gender.textContent = `Gender: ${character.gender}`;
				const species = document.createElement("p");
				species.classList.add("card-text");
				species.textContent = `Species: ${character.species}`;
				cardBody.appendChild(title);
				cardBody.appendChild(status);
				cardBody.appendChild(species);
				cardBody.appendChild(gender);
				card.appendChild(img);
				card.appendChild(cardBody);
				div.appendChild(card);
				containerCards.appendChild(div);
			});
			loadPlanetsButton.classList.add("d-none");
			loadMoreEpisodesButton.classList.add("d-none");
			nextResidentsButton.add("d-none");
		});
}

function loadLocations() {
	fetch(`${ApiUrl}/location?page=${locatiosPage}`)
		.then((response) => response.json())
		.then((data) => {
			episodesList.innerHTML = ""; // Limpiar contenido de episodios
			containerCards.innerHTML = ""; // Limpiar contenido de tarjetas

			data.results.forEach((location) => {
				const li = document.createElement("li");
				li.classList.add("nav-item");
				const link = document.createElement("a");
				link.classList.add("nav-link");
				link.href = "#";
				link.textContent = `${location.id} - ${location.name} - ${location.type} - ${location.dimension}`;
				link.addEventListener("click", () => {
					containerCards.innerHTML = "";
					resultsPage = 1;

					const card = document.createElement("div");
					card.classList.add("card");
					const cardBody = document.createElement("div");
					cardBody.classList.add("card-body");
					const title = document.createElement("h5");
					title.classList.add("card-title");
					title.textContent = location.name;
					const dimension = document.createElement("p");
					dimension.classList.add("card-text");
					dimension.textContent = `Tipo de dimensión: ${location.dimension}`;
					const residentsTitle = document.createElement("p");
					residentsTitle.classList.add("card-text");
					residentsTitle.textContent = "Residentes:";
					const residentsGrid = document.createElement("div");
					residentsGrid.classList.add("row", "row-cols-4", "mb-3");
					residentsGrid.id = "residentsGrid";

					cardBody.appendChild(title);
					cardBody.appendChild(dimension);
					cardBody.appendChild(residentsTitle);
					cardBody.appendChild(residentsGrid);
					card.appendChild(cardBody);
					containerCards.appendChild(card);

					const residents = location.residents;
					let currentPage = 1;

					function showResidents() {
						const startIndex = (currentPage - 1) * residentsPerPage;
						const endIndex = startIndex + residentsPerPage;
						const residentsToShow = residents.slice(
							startIndex,
							endIndex
						);

						containerCards.innerHTML = ""; // Limpiar contenido del contenedor

						residentsToShow.forEach((residentUrl) => {
							fetch(residentUrl)
								.then((response) => response.json())
								.then((data) => {
									const cardCol =
										document.createElement("div");
									cardCol.classList.add("col-6", "col-md-3");

									const card = document.createElement("div");
									card.classList.add(
										"card",
										"mb-3",
										"card.shadow-sm"
									);

									const img = document.createElement("img");
									img.src = data.image;
									img.classList.add("card-img-top");

									const cardBody =
										document.createElement("div");
									cardBody.classList.add("card-body");

									const title = document.createElement("h5");
									title.classList.add("card-title");
									title.textContent = data.name;

									const status = document.createElement("p");
									status.classList.add("card-text");
									status.textContent = `Status: ${data.status}`;

									const species = document.createElement("p");
									species.classList.add("card-text");
									species.textContent = `Species: ${data.species}`;
									const gender = document.createElement("p");
									gender.classList.add("card-text");
									gender.textContent = `Gender: ${data.gender}`;

									cardBody.appendChild(title);
									cardBody.appendChild(status);
									cardBody.appendChild(species);
									cardBody.appendChild(gender);

									card.appendChild(img);
									card.appendChild(cardBody);

									cardCol.appendChild(card);
									containerCards.appendChild(cardCol);
								});
						});
						prevResidentsButton.classList.toggle(
							"d-none",
							currentPage === 1
						);
						nextResidentsButton.classList.toggle(
							"d-none",
							endIndex >= residents.length
						);
					}

					function showNextPage() {
						currentPage++;
						showResidents();
					}

					function showPreviousPage() {
						currentPage--;
						showResidents();
					}

					showResidents();

					prevResidentsButton.addEventListener(
						"click",
						showPreviousPage
					);
					nextResidentsButton.addEventListener("click", showNextPage);
				});

				li.appendChild(link);
				episodesList.appendChild(li);
			});

			loadMoreEpisodesButton.classList.add("d-none");
			loadMoreCardsButton.classList.add("d-none"); // Ocultar botón de cargar más episodios
			loadPlanetsButton.classList.remove("d-none"); // Activar botón de localizaciones
		});
}
function clearContainer() {
	episodesList.innerHTML = "";
	containerCards.innerHTML = "";
}

loadPlanetsButton.addEventListener("click", () => {
	locatiosPage++;
	loadLocations();
});
loadTopEpisodesBtn.addEventListener("click", () => {
	clearContainer();
	loadEpisodes();
});

topLocationBtn.addEventListener("click", () => {
	currentPage = 1;
	clearContainer();
	loadLocations();
});
topCharactersBtn.addEventListener("click", () => {
	clearContainer();
	loadCharacters();
});
