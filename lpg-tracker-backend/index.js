const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// setting up the express app

dotenv.config();
const app = express();

// setting up the mongoose database and connecting to it

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("MongoDB connection Failed");
    console.log(err);
})
// fixing port as 5000 or choose the one given in .env
const PORT = process.env.PORT || 5000;

// to initialize the remedy to cors error

app.use(cors());
app.use(express.json());

// establishing / initiating the routes to the api's of both auth and cylinder

const authRoutes = require('./routes/authRoutes');
const cylinderRoutes = require('./routes/cylinderRoutes');

// using them to ref from their respective .js files

app.use('/api/user', authRoutes);
app.use('/api', cylinderRoutes);

// basic get request from the boiler plate for server running

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// to connect and listen to the port

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});