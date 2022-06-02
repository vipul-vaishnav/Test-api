import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// reading files
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../', 'dev-data', 'data', 'data.json');

const readFilePro = (path) => {
  return readFileSync(path, 'utf-8');
};

const data = JSON.parse(readFilePro(dataPath));

// Get all Data
const getData = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      data,
    },
  });
};

// Get single Data
const getOne = (req, res) => {
  const { id } = req.params;
  const [obj] = data.filter((obj) => obj.id === id);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      obj,
    },
  });
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

export { getData, getOne, postData, updateData, deleteData };
