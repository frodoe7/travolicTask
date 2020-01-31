var express = require("express");
var router = express.Router();
var atob = require('atob');
var perfy = require('perfy');
var { validateFiltersObject } = require('./validations');
var { fetchHotels , applyFilters , applySorting } = require('./controls');

router.get('/fetch/:filtersObject', async function(req, res){
   var object;
   
   try
   {
      object = JSON.parse(atob(req.params.filtersObject));
   }
   catch (err)
   {
      res.statusCode = 422;
      res.send("Bad Format").end();
   }

   var validations = validateFiltersObject(object);
   if (validations.length == 0)
   {
      perfy.start('fetching hotels');
      var hotels = await fetchHotels();
      var result = perfy.end('fetching hotels');
      console.log("Hotels fetched in " + result.time + " seconds");

      if (hotels)
      {
         var filteredData = applyFilters(hotels , object);
         var sortedData = applySorting(filteredData , object);
         res.send(sortedData);
      }
      else
      {
         res.statusCode = 500;
         res.send("Internal Server Error").end();
      }
   }
   else
   {
      res.statusCode = 422;
      res.send(validations[0].message);
   }
});

module.exports = router;