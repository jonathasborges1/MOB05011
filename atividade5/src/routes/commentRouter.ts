import express from 'express';
import { createComment, getViewForm } from '../controller/commentsController';

const routerComments = express.Router();

routerComments.get('/', getViewForm);
routerComments.post('/formulario', createComment);

export default routerComments;
