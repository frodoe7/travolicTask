var axios = require('axios').default;
var moment = require('moment');
var { sortBy } = require('underscore');

exports.fetchHotels = async function ()
{
    return await axios.get('https://api.myjson.com/bins/tl0bp').then(result => {
        return result.data.hotels;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

exports.applyFilters = function(data , filters)
{
    var filteredData = data;

    if (filters.name) filteredData = filterName(filteredData , filters.name);
    if (filters.city) filteredData = filterCity(filteredData , filters.city);
    if (filters.price) filteredData = filterPriceRange(filteredData , filters.price[0] , filters.price[1]);
    if (filters.date) filteredData = filterDateRange(filteredData , moment(filters.date[0], "DD-MM-YYYY") , moment(filters.date[1], "DD-MM-YYYY"));

    return filteredData;
}

exports.applySorting = function (data , sorting)
{
    var sortedData = data;

    if (sorting.sortName) sortedData = sortName(sortedData , sorting.sortName);
    if (sorting.sortPrice) sortedData = sortPrice(sortedData , sorting.sortPrice);

    return sortedData;
}


// ? filter functions
function filterName(data,name)
{
    var newData = [];
    for (var i = 0 ; i < data.length ; i++)
    {
        if (data[i].name.includes(name))
           newData.push(data[i]);
    }

    return newData;
}

function filterCity(data,city)
{
    var newData = [];
    for (var i = 0 ; i < data.length ; i++)
    {
        if (data[i].city.includes(city))
           newData.push(data[i]);
    }

    return newData;
}

function filterPriceRange(data,minPrice,maxPrice)
{
    var newData = [];
    for (var i = 0 ; i < data.length ; i++)
    {
        if (InRange(data[i].price , minPrice , maxPrice))
           newData.push(data[i]);
    }

    return newData;
}

function filterDateRange(data,minDate,maxDate)
{
    var newData = [];
    for (var i = 0 ; i < data.length ; i++)
    {
        var availableSlots = data[i].availability;

        availableSlots.forEach(slot => {
            var startDate = moment(slot.from, "DD-MM-YYYY") , endDate = moment(slot.to, "DD-MM-YYYY");
            if (InRange(minDate , startDate , endDate) && InRange(maxDate , startDate , endDate))
               newData.push(data[i]);
        });
    }

    return newData;
}


// ? Sorting functions
function sortName(data , mode)
{
    var sortedData = sortBy(data , "name");
    return (mode == 1) ? sortedData : sortedData.reverse(); 
}

function sortPrice(data , mode)
{
    var sortedData = sortBy(data , "price");
    return (mode == 1) ? sortedData : sortedData.reverse();
}


// ? Helper functions
function InRange(val,min,max)
{
    return (val < max) && (val > min);
}