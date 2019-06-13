const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    // RES - RESPOSTA
    // REQ - REQUISIÇÃO

    // RETORNA TODOS OS POSTS ORDENADO PELA DATA DE CRIAÇÃO (MAIS RECENTE)
    async index(req, res) {
       const posts = await Post.find().sort('-createdAt');
       return res.json(posts);
    },

    // 
    async store(req, res) {
        // RECEBE OS DADOS DO ARQUIVO E AS OUTRAS INFORMAÇÕES DO POST
        const {author, place, description, hastags } = req.body;
        const { filename: image } = req.file;

        // MUDA A EXTENSÃO PARA JPEG
        const [name] = image.split('.');
        const filename = `${name}.jpg`;

        // REDIMENSIONA A IMAGEM
        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(
            path.resolve(req.file.destination, 'resized', filename)
        )

        // REMOVE O ARQUIVO ORIGINAL
        fs.unlinkSync(req.file.path);

        // SALVA O POST NO BANCO DE DADOS
        const post = await Post.create({
            author,
            place,
            description,
            hastags,
            image: filename,
        });

        // EMITINDO PARA TODA A APLICAÇÃO QUE TEM UM NOVO POST (EM TEMPO REAL)
        req.io.emit('post', post);

        return res.json(post);
    }
};