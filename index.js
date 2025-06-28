
const express = require('express');
const app = express();

const productRoutes = require('./routes/products');


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World 🌍');
});
app.use('/api/products', productRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const logger = require('./middleware/logger');
app.use(logger);

const errorHandler = require('./middleware/errorHandler');



app.use(errorHandler); 

