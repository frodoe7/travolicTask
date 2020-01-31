# Backend Task

the steps after cloning the project
* npm install
* npm start

to run the acceptance tests
* npm run test

packages used in this project
* axios
* underscore
* express
* validate
* atob
* btoa
* moment
* perfy

the project has a single GET web service 
#### /api/fetch/:filtersObject

filtersObject should be encoded base64 , check the below code

```javascript
var object = { name : "Hotel" , city : "Cairo" , price : [60,90] , date : ["20-10-2020" , "26-10-2020"] };
var stringOfObject = JSON.stringify(object);
var filtersObject = btoa(stringOfObject); // eyJuYW1lIjoiSG90ZWwiLCJjaXR5IjoiQ2Fpcm8iLCJwcmljZSI6WzYwLDkwXSwiZGF0ZSI6WyIyMC0xMC0yMDIwIiwiMjYtMTAtMjAyMCJdfQ==
```

therefore , filtersObject should be
`eyJuYW1lIjoiSG90ZWwiLCJjaXR5IjoiQ2Fpcm8iLCJwcmljZSI6WzYwLDkwXSwiZGF0ZSI6WyIyMC0xMC0yMDIwIiwiMjYtMTAtMjAyMCJdfQ==`

Contact me , if you have any questions ``27mdmo7sn@gmail.com``