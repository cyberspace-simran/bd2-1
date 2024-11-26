const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');
app.use(cors());

// The data is being imported from hotel.js.
const hotels = require('./hotel');
app.get('/hotels-data', (req, res) => {
  res.json({ hotels: hotels });
});

// Endpoint 1: Get the hotels sorted by pricing

function sortByPricing(pricing, a, b) {
  if (pricing === 'low-to-high') {
    return a.price - b.price; // Ascending order
  } else if (pricing === 'high-to-low') {
    return b.price - a.price; // Descending order
  }
}

app.get('/hotels/sort/pricing', (req, res) => {
  let hotelsCopy = hotels.slice();
  let pricing = req.query.pricing;

  hotelsCopy.sort((a, b) => sortByPricing(pricing, a, b));
  res.json(hotelsCopy);
});

// Endpoint 2: Get the hotels sorted based on their Ratings

function sortByRating(rating, a, b) {
  if (rating === 'low-to-high') {
    return a.rating - b.rating; // Ascending order
  } else if (rating === 'high-to-low') {
    return b.rating - a.rating; // Descending order
  }
}

app.get('/hotels/sort/rating', (req, res) => {
  let hotelsCopy = hotels.slice();
  let rating = req.query.rating;

  hotelsCopy.sort((a, b) => sortByRating(rating, a, b));
  res.json(hotelsCopy);
});

// Endpoint 3: Get the Hotels sorted based on their Reviews

function sortByReviews(reviews, a, b) {
  if (reviews === 'least-to-most') {
    return a.reviews - b.reviews; // Ascending order
  } else if (rating === 'most-to-least') {
    return b.reviews - a.reviews; // Descending order
  }
}

app.get('/hotels/sort/reviews', (req, res) => {
  let hotelsCopy = hotels.slice();
  let reviews = req.query.reviews;

  hotelsCopy.sort((a, b) => sortByReviews(reviews, a, b));
  res.json(hotelsCopy);
});

// Endpoint 4: Filter the hotels based on the Hotel Amenity
function filterByAmenity(hotelsObj, amenity) {
  return hotelsObj.amenity === amenity;
}

app.get('/hotels/filter/amenity/:amenity', (req, res) => {
  let amenity = req.params.amenity;
  let results = hotels.filter((hotelsObj) =>
    filterByAmenity(hotelsObj, amenity)
  );
  res.json(results);
});

// Endpoint 5: Filter the hotels based on the selected Country
function filterByCountry(hotelsObj, country) {
  return hotelsObj.country === country;
}

app.get('/hotels/filter/country/:country', (req, res) => {
  let country = req.params.country;
  let results = hotels.filter((hotelsObj) =>
    filterByCountry(hotelsObj, country)
  );
  res.json(results);
});
// Endpoint 6: Filter the hotels based on the selected Category

function filterByCategory(hotelsObj, category) {
  return hotelsObj.category === category;
}

app.get('/hotels/filter/category/:category', (req, res) => {
  let category = req.params.category;
  let results = hotels.filter((hotelsObj) =>
    filterByCategory(hotelsObj, category)
  );
  res.json(results);
});

// Endpoint 7: Send all hotels
app.get('/hotels', (req, res) => {
  res.json(hotels);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
