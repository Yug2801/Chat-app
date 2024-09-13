const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes =require('./routes/userRoutes');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));
const server= app.listen(process.env.PORT,()=>
{
    console.log(`Server is running on port ${process.env.PORT}`);
}
);

