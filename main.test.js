var btoa = require('btoa');
var axios = require("axios").default;

describe('testing wrong formats', () => {
   test('empty param should return empty 404', async () => {
     var result = await callMainAPI("");
     expect(result.status).toBe(404);
   })

   test('incorrect base64 string should return 422 and Bad Format Message', async () => {
    var result = await callMainAPI(",mmsa&nsdk");
    expect(result.status).toBe(422);
    expect(result.data).toBe("Bad Format");
  })
});

describe('testing wrong validations' , () => {
  describe('name validations' , () => {
    test('wrong name type should return 422 and incorrect type message' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({name:1})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("name must be of type String.");
    })
  
    test('wrong name format should return 422 and incorrect format message' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({name:"Ah37med"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("name must match /^[a-zA-Z]+$/.");
    })
  
    test('name out of the allowed length should return 422 and incorrect length message' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({name:"a"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("name must have a length between 2 and 42.");
    })

    test('correct name should return 200' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({name:"ahmed"})));
      expect(result.status).toBe(200);
    })
  })

  describe('city validations' , () => {
    test('city should be one of predefined values' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({city:"Ah37med"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("city must be either dubai, cairo, london, paris, Vienna or Manila.");
    })

    test('correct city should return 200' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({city:"cairo"})));
      expect(result.status).toBe(200);
    })
  })

  describe('price validations' , () => {
    test('price should be array' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({price:"Ah37med"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("price must be of type Array.");
    })

    test('prices values should be numbers' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({price:[30,"Ahmed"]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("Error In Prices Values");
    })

    test('prices array should have a fixed length of 2' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({price:[30,10,15]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("price must have a length of 2.");
    })

    test('second price should be bigger than the first price' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({price:[30,10]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("Error In Prices Values");
    })

    test('correct price values' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({price:[10,20]})));
      expect(result.status).toBe(200);
    })
  })

  describe('date validations' , () => {
    test('date should be array' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({date:"Ah37med"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("date must be of type Array.");
    })

    test('date values should be strings' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({date:[30,"Ahmed"]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("Error In Dates Values");
    })

    test('date array should have a fixed length of 2' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({date:["17-10-2020","04-10-2020","05-10-2020"]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("date must have a length of 2.");
    })

    test('second date should be bigger than the first date' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({date:["17-10-2020","04-10-2020"]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("Error In Dates Values");
    })

    test('dates values should have a date DD-MM-YYYY format' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({date:["*04102020--","10-27-2020"]})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("Error In Dates Values");
    })

    test('correct price values' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({date:["04-10-2020","17-10-2020"]})));
      expect(result.status).toBe(200);
    })
  })

  describe('sortName validations' , () => {
    test('sortName should be one of predefined values' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({sortName:"Ah37med"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("sortName must be either -1 or 1.");
    })

    test('sortName city should return 200' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({sortName:1})));
      expect(result.status).toBe(200);
    })
  })

  describe('sortPrice validations' , () => {
    test('sortPrice should be one of predefined values' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({sortPrice:"Ah37med"})));
      expect(result.status).toBe(422);
      expect(result.data).toBe("sortPrice must be either -1 or 1.");
    })

    test('sortPrice city should return 200' , async () => {
      var result = await callMainAPI(btoa(JSON.stringify({sortPrice:1})));
      expect(result.status).toBe(200);
    })
  })
})

async function callMainAPI(data)
{
  return await axios.get('http://localhost:8080/api/fetch/' + data).then(result => {
    return result;
  }).catch(err => {
    return err.response;
  });
}