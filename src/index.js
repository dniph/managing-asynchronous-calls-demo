const axios = require('axios');
const dotEnv = require('dotenv');

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY; // Access the API_KEY from .env file



// const getLocationFromQuery = (query) => {
//   // Make the first API call to get latitude and longitude
//   findLatitudeAndLongitude(query)
//     .then((response) => {
//       // `response` is the data returned from the findLatitudeAndLongitude promise

//       // Make the next API call here, where we can use the `response` data from the previous call
//       findLocation(response.latitude, response.longitude);
//     })
//     .catch((error) => {
//       console.log('getLocationFromQuery: error fetching location from query!');
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

// const findLatitudeAndLongitude = (query) => {
//   let latitude, longitude;

//   // Return the promise chain created by the axios call
//   return axios.get('https://us1.locationiq.com/v1/search.php',
//     {
//       params: {
//         key: LOCATIONIQ_KEY,
//         q: query,
//         format: 'json'
//       }
//     })
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       console.log('success in findLatitudeAndLongitude!', latitude, longitude);

//       return {latitude, longitude}; // Return the data we want to pass on
//     })
//     .catch((error) => {
//       console.log('error in findLatitudeAndLongitude!');
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

// const findLocation = (latitude, longitude) => {
//   axios.get('https://us1.locationiq.com/v1/reverse.php',
//     {
//       params: {
//         key: LOCATIONIQ_KEY,
//         format: 'json',
//         lat: latitude,
//         lon: longitude
//       }
//     })
//     .then((response) => {
//       console.log('success in findLocation!', response.data);
//     })
//     .catch((error) => {
//       console.log('error in findLocation!', error);
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

// getLocationFromQuery('Seattle, Washington, USA');


// Lista de maravillas
const wonders = [
  "Great Wall of China",
  "Petra, Jordan",
  "Colosseum, Rome",
  "Chichen Itza, Mexico",
  "Machu Picchu, Peru",
  "Taj Mahal, India",
  "Christ the Redeemer, Brazil"
];

// Función para pausar
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Buscar lat y lon
const findLatitudeAndLongitude = async (query) => {
  try {
    const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
      params: {
        key: LOCATIONIQ_KEY,
        q: query,
        format: 'json'
      }
    });

    const latitude = response.data[0].lat;
    const longitude = response.data[0].lon;
    console.log(`✔ ${query}: ${latitude}, ${longitude}`);
    return { latitude, longitude };

  } catch (error) {
    console.error(`❌ Error fetching: ${query}`);
    return { latitude: null, longitude: null };
  }
};

// Función principal que itera con pausa
const getWondersCoordinates = async () => {
  const result = {};

  for (let i = 0; i < wonders.length; i++) {
    const place = wonders[i];
    const coords = await findLatitudeAndLongitude(place);
    result[place] = coords;

    // Esperar 500ms entre llamadas
    await sleep(500);
  }

  console.log("\n🌍 Coordenadas de las 7 Maravillas:");
  console.log(JSON.stringify(result, null, 2));
};

getWondersCoordinates();