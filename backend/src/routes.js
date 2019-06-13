// PERMITE LIDAR COM AS ROTAS, PARAMETROS E AS ROTAS
const express = require('express');
// Biblioteca que cuida de forms com arquivos (multipart formdata)
const multer = require('multer');
const uploadsConfig = require('./config/upload');
// CONTROLLERS
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadsConfig);

/* Definindo as rotas e direcionando o que será chamado */
// Pegando todos os posts do app
routes.get('/posts', PostController.index);
// Fazendo o upload de uma foto, um post no app
routes.post('/posts', upload.single('image'), PostController.store);
// Rota que permite a realização de likes
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;