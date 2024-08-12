const express = require("express");
const dotenv = require("dotenv");
const DBCONNECTION = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoute = require("./routes/userRoute");
const specificationRouter = require('./routes/specificatinRouter');
const adminRouter = require('./routes/adminRouter');
const { errorHandler } = require('./middleware/ErrorHandler');

DBCONNECTION();
const app = express();

app.use(express.json());

app.use("/api/product", productRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRoute);
app.use("/api/specification", specificationRouter);

const PORT = process.env.PORT;

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === "EADDRINUSE") {
        console.log(`This  ${PORT} is in use`);
    } else {
        console.log(`Error starting server`, err);
    }
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.log("Server is Shutting down due to uncaughtException", error);
    process.exit(1);
});

process.once('unhandledRejection', (error) => {
    console.log("Server is Shutting down due to unhandledRejection", error);
    server.close(() => {
        process.exit(1);
    });
});