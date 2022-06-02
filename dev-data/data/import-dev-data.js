import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import objModel from '../../models/objectModel.js';

dotenv.config({ path: './config.env' });

// ===============================================================================================
//The 'fileURLToPath' method returns the fully-resolved platform-specific Node.js file path.
const __filename = fileURLToPath(import.meta.url);

// use the 'dirname()' method from the 'path' module. The 'dirname' method takes a path as a parameter and returns the directory name of the 'path'.
const __dirname = path.dirname(__filename);

// Reading files synchronously
const readFileFunc = (path) => {
  return readFileSync(`${path}`, 'utf-8');
};
// ===============================================================================================

// Tours Path
const dataPath = path.join(__dirname, 'data.json');

// Reading file at 'toursPath' path
const data = JSON.parse(readFileFunc(dataPath));

// connecting to db
console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB CONNECTED'));

// IMPORT DATA INTO DB

const importData = async () => {
  try {
    await objModel.create(data);
    console.log('DATA SUCCESSFULLY LOADED');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION

const deleteData = async () => {
  try {
    await objModel.deleteMany();
    console.log('DATA SUCCESSFULLY DELETED');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
