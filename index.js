import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import objRouter from './views/objRoutes.js';

dotenv.config({ path: './config.env' });

// initialising express app
const app = express();

// middlewares
const env = process.env.NODE_ENV;

if (env === 'development') {
  // 1)
  app.use(morgan('dev'));
}

// 2)
app.use(express.json());

// 3) routes
app.use('/api/v1/all', objRouter);

export default app;

// [{"id":"1","Name":"Anakin","Gender":"male","Homeworld":"Tatooine","Born":"41.9BBY","Jedi":"yes"},{"id":"2","Name":"Amidala","Gender":"female","Homeworld":"Naboo","Born":"46BBY","Jedi":"no"},{"id":"3","Name":"R2-D2","Gender":"unknown","Homeworld":"Naboo","Born":"33BBY","Jedi":"no"},{"id":"4","Name":"Vipul","Gender":"Male","Homeworld":"Asgard","Born":"49BBY","Jedi":"yes"},{"id":"5","Name":"Gunther","Gender":"Male","Homeworld":"Samstein","Born":"21ZZY","Jedi":"no"},{"id":"d32ca335-4917-4146-9552-ead5614a236e","Name":"Charlotte","Gender":"Female","Homeworld":"Saturn","Born":"42.4GGY","Jedi":"yes"},{"id":"b4306dfe-02aa-4d77-a75d-2de83a1616ff","Name":"Markus","Gender":"Male","Homeworld":"Hakus","Born":"42.1GGY","Jedi":"no"},{"id":"6","Name":"Samantha","Gender":"Female","Homeworld":"Mars","Born":"72ZZY","Jedi":"no"}]
