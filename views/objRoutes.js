import express from 'express';
import { getData, getOne, postData, updateData, deleteData } from '../controllers/objController.js';

const objRouter = express.Router();

objRouter.route('/').get(getData).post(postData);

objRouter.route('/:id').get(getOne).patch(updateData).delete(deleteData);

export default objRouter;
