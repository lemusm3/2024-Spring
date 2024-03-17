<<<<<<< HEAD
console.log("Hello World")
=======
const express = require('express');
/* B"H
*/

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello New Paltz!')
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
>>>>>>> efbb3a7 (Add server/index.js file with basic Express setup)
