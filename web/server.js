const express = require('express'),
  app = express(),
  port = process.env.PORT || 80,
  bodyParser = require('body-parser'),
  rateLimit = require('express-rate-limit'),
  path = require('path');

let userCounter = 0;
const limiter = rateLimit({
  windowMs: 86400000,
  max: 10
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', limiter);

app.route('/users')
  .get((req, res) => {
    res.json(userCounter);
  })
  .post((req, res) => {
    userCounter++;
    res.sendStatus(200);
  });

app.route('/')
  .get((req, res) => {
    res.sendFile(`${path.join(__dirname)}/index.html`);
  });

app.listen(port);

console.log('start on: ' + port);