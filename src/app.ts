"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import express from 'express'

const app = express();
const PORT = process.env.PORT || 3300;

app.listen(PORT, ()=> {
    console.log(`Minigram server is running on port ${PORT}`);
})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));