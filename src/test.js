const { animals } = require("./data");

function displayConfig(animalMapDisplay, options) {
  if (options.includeName) {
    animalMapDisplay.includeName();
  }
  if (options.sex) {
    animalMapDisplay.filterSex(options.sex);
  }
  if (options.sort) {
    animalMapDisplay.sort();
  }
}

function getAnimalsByLocation(local) {
  const animalMapDisplay = animals
    .filter((animal) => animal.location === local)
    .map((animal) => animal.name);

  return animalMapDisplay;
}

function getAnimalName(animalsByRegion) {
  return animalsByRegion.flatMap((animal) =>
    animals
      .filter((animalData) => animalData.name === animal)
      .flatMap((animalObject) => animalObject.residents).map(element => element.name)
  );
}

function animalMap(options = {}) {
  const locals = ["NE", "NW", "SE", "SW"];
  const animalMap = {
    includeName: function () {
      Object.entries(this)
        .filter((animalsByRegion) => typeof animalsByRegion[1] === "object")
        .forEach(
          (animalsByRegion) =>
            (this[animalsByRegion[0]] = getAnimalName(animalsByRegion[1]))
        );
    },
  };
  locals.forEach((element) => {
    animalMap[element] = getAnimalsByLocation(element, options);
  });
  displayConfig(animalMap, options);
  return animalMap.filter((animalsByRegion) => typeof animalsByRegion[1] === "object");
}

console.log(animalMap({ includeName: true }));


