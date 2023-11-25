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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
