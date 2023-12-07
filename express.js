const express = require('express');
const cypress = require('cypress');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  await cypress.run({
    reporter: 'junit',
    browser: 'chrome',
    config: {},
    env: {},
  });

  const data = fs.readFileSync('./result.json', 'utf8');
  res.send(data);
});

app.get('/test', async (req, res) => {
  res.json(
    {
      "crawlTime": "2023-12-01T08:59:53.484Z",
      "balance": 35,
      "overview": [
        {
          "day": "2023-11-26T23:00:00.000Z",
          "active": false,
          "ordered": false
        },
        {
          "day": "2023-11-27T23:00:00.000Z",
          "active": false,
          "ordered": false
        },
        {
          "day": "2023-11-28T23:00:00.000Z",
          "active": false,
          "ordered": true
        },
        {
          "day": "2023-11-29T23:00:00.000Z",
          "active": false,
          "ordered": false
        },
        {
          "day": "2023-11-30T23:00:00.000Z",
          "active": true,
          "ordered": false
        },
        {
          "day": "2023-12-03T23:00:00.000Z",
          "active": true,
          "ordered": false
        },
        {
          "day": "2023-12-04T23:00:00.000Z",
          "active": true,
          "ordered": false
        },
        {
          "day": "2023-12-05T23:00:00.000Z",
          "active": true,
          "ordered": true
        },
        {
          "day": "2023-12-06T23:00:00.000Z",
          "active": true,
          "ordered": false
        },
        {
          "day": "2023-12-07T23:00:00.000Z",
          "active": true,
          "ordered": false
        }
      ],
      "orderedToday": false,
      "orderedNextWeek": false
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
