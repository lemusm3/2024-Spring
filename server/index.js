<<<<<<< HEAD
console.log("Hello World")
=======
const express = require('express');
const users = require('./controllers/users');
/* B"H
*/

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello New Paltz!')
})
.use('/users', users)


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
<<<<<<< HEAD
});
>>>>>>> efbb3a7 (Add server/index.js file with basic Express setup)
=======
});
>>>>>>> 96fc89f (Starting Express)
