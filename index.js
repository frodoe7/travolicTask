var app = require('express')();

app.use('/api' , require('./webservices'));

app.listen(8080 , () => {
    console.log("Server Started!");
});