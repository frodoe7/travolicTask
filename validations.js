var moment = require('moment');
var Schema = require('validate');

var validatePricesArray = val => { 
    if (val == undefined) return true;
    return (val[0] < val[1]);
};

var validateDatesArray = val => {
    if (val == undefined) return true;
    var minDate = moment(val[0], "DD-MM-YYYY");
    var maxDate = moment(val[1], "DD-MM-YYYY");
    return (minDate < maxDate);
}

var filters = new Schema({
    name : {
        type : String,
        match : /^[a-zA-Z]+$/,
        required : false,
        length : { min : 2 , max : 42 }
    },
    city : {
        required : false,
        enum : ['dubai' , 'cairo' , 'london' , 'paris' , 'Vienna' , 'Manila']
    },
    price : {
        type : Array,
        each : { type : Number },
        length : 2,
        use : { validatePricesArray }
    },
    date : {
        type : Array,
        each : { type : String },
        length : 2,
        use : { validateDatesArray }
    },
    sortName : {
        required : false,
        enum : [-1,1]
    },
    sortPrice : {
        required : false,
        enum : [-1,1]
    }
});

filters.message({
    validateDatesArray : "Error In Dates Values",
    validatePricesArray : "Error In Prices Values"
});

exports.validateFiltersObject = function (_filters) {
    return filters.validate(_filters);
}