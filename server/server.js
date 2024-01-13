import express from 'express';
import routes from './routes/routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);
app.listen(port, ()=>console.log('Server started'));