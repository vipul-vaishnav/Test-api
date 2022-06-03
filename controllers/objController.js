import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import objModel from '../models/objectModel.js';

// reading files
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../', 'dev-data', 'data', 'data.json');

const readFilePro = (path) => {
  return readFileSync(path, 'utf-8');
};

const data = JSON.parse(readFilePro(dataPath));

// Get all Data
const getData = async (req, res) => {
  try {
    const data = await objModel.find();

    res.status(200).json({
      status: 'success',
      results: data.length,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get single Data
const getOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await objModel.findById(id);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// get movies or series
const getCategoryData = async (req, res) => {
  try {
    const { category } = req.params;
    const options = category === 'movies' ? { category: 'Movie' } : { category: 'TV Series' };
    const data = await objModel.find(options);
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// get movie or series by name and category
const getOneByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const options = { title: title };
    const data = await objModel.find(options);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Post new Data
const postData = (req, res) => {
  const id = uuidv4();
  const newObj = { id, ...req.body };
  const newData = [...data];
  newData.push(newObj);
  writeFile(dataPath, JSON.stringify(newData), (err) => {
    if (err) console.log(err);
    console.log('Data posted successfully');
  });
  res.status(201).json({
    status: 'ok',
    message: 'data posted successfully',
    data: {
      newObj,
    },
  });
};

// update one
const updateData = (req, res) => {
  const { id } = req.params;
  const [obj] = data.filter((object) => object.id === id);
  const newObj = { ...obj, ...req.body };
  const newData = [...data];
  const newDataArr = newData.filter((object) => object.id !== id);
  newDataArr.push(newObj);
  writeFile(dataPath, JSON.stringify(newDataArr), (err) => {
    if (err) console.log(err);
    console.log('Data posted successfully');
  });

  res.status(200).json({
    status: 'success',
    message: 'object updated successfully',
  });
};

// delete data
const deleteData = (req, res) => {
  const { id } = req.params;
  const newData = [...data].filter((obj) => obj.id !== id);
  writeFile(dataPath, JSON.stringify(newData), (err) => {
    if (err) console.log(err);
    console.log('Data posted successfully');
  });

  res.status(200).json({
    status: 'success',
    message: 'object deleted successfully',
  });
};

export { getData, getOneById, postData, updateData, deleteData, getCategoryData, getOneByTitle };
