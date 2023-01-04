const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
//const https=require("https")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/food.html")
})
app.post("/", (req, res) => {
  const food = req.body.foods

  request.get({
    url: 'https://api.calorieninjas.com/v1/nutrition?query=' + food,
    headers: {
      'X-Api-Key': 'yCmPXYKHWngw91XJ8uuMwkiMtRFoqtCOl5E5G2ks'
    },
  }, function (error, response, body) {
    if (error) return console.error('Request failed:', error);
    else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else {
      const d = JSON.parse(body)
      console.log(d)
      const c = d.items[0].calories
      const s = d.items[0].sugar_g
      res.send("calories " + c + " sugar " + s)
      // const dataa=JSON.parse(body)
      // const calorie=dataa.items[0].calories;
      // console.log(response.data)
      // res.write("the"+food+"calories is "+calorie);
      // res.send
    }


  })
})
app.listen(process.env.PORT || 3000, () => {
  console.log("server has started")
})
