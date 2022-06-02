import app from './index.js';
import mongoose from 'mongoose';

// connecting to the mongodb database
const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const connect_to_database = (uri) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Database connection established');
    })
    .catch((error) => console.log(error.message));
};

connect_to_database(db);

// server listening to requests
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
