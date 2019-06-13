const mongoose = require('mongoose');

// REPRESENTAÇÃO DA TABELA DO BANCO DE DADOS, EM FORMATO DE JAVASCRIPT

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hastags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema)