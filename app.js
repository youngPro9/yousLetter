//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/86d02296a4",
    method: "POST",
    headers: {
      "Authorization": "youngsu1 0ea30961475ca019d2c214f14a9fb44a-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || port, function() {
  console.log("The server is running on Port " + port);
});


// API Key
// 0ea30961475ca019d2c214f14a9fb44a-us20

// LIST ID
// 86d02296a4
