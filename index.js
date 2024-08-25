const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const businessOwnerRoutes = require('./routes/businessOwnerRoutes');
const businessRoutes = require('./routes/businessRoutes');
const staffRoutes = require('./routes/staffRoutes');
const foodRoutes = require('./routes/foodRoutes'); 
const fruitRoutes = require('./routes/fruitRoutes');
const addonRoutes = require('./routes/addonRoutes');
const hotDrinkRoutes = require('./routes/hotDrinkRoutes'); 
const softDrinkRoutes = require('./routes/softDrinkRoutes');
const orderRoutes = require('./routes/orderRoutes');
const setupSwagger = require('./swagger').default;

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.use(express.json());

setupSwagger(app);


app.get('/', (req, res) => {
    res.send('Welcome to Alama App API!');
});

const specs = swaggerJsDoc(options);

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
  );

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


// Routes
app.use('/api/business_owners', businessOwnerRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/addons', addonRoutes); 
app.use('/api/hotDrinks', hotDrinkRoutes);
app.use('/api/softDrinks', softDrinkRoutes); 
app.use('/api/orders', orderRoutes); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
