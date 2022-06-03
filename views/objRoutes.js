import express from 'express';
import {
  getData,
  getOneById,
  postData,
  updateData,
  deleteData,
  getCategoryData,
  getOneByTitle,
} from '../controllers/objController.js';

const objRouter = express.Router();

objRouter.route('/').get(getData).post(postData);

objRouter.route('/id/:id').get(getOneById).patch(updateData).delete(deleteData);

objRouter.route('/category/:category').get(getCategoryData);

objRouter.route('/title/:title').get(getOneByTitle);

export default objRouter;
