const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
connectDB();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/user', require("./routes/userRoutes"))
app.use('/api/workout', require("./routes/workoutRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`Server Listening at port ${port}`))