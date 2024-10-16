import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import routes from "./routes/registration.route";
import cors from 'cors'

const app = express();
app.use(cors(config.corsOption))
app.use(express.json());
app.use('/api/v1', routes);

mongoose.connect(config.database.mongodb.uri, config.database.mongodb.options)
    .then(res => {
        if (res) {
            console.info(`Database Connected Successfully: ${config.database.mongodb.uri}`)
        }
    }).catch(err => {
        console.info(`Error connecting to database: ${err}`)
    })


app.listen(config.app.port, config.app.host, () => {
    console.info(`Server running at ${config.app.host}: ${config.app.port}- ${config.app.name}`)
})