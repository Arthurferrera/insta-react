const Post = require('../models/Post');

module.exports = {

    // RES - RESPOSTA
    // REQ - REQUISIÇÃO

    async store(req, res) {
        // RESGATANDO O POST PELO ID RECEBIDO PELA URL(PARAMS)
        const post = await Post.findById(req.params.id);

        // ACRESCENTANDO O NUMERO DE LIKES
        post.likes += 1;

        // SALVANDO NA BASE O POST COM O NUMERO DE LIKES ATUALIZADO
        await post.save();

        // EMITINDO PARA TODA A APLICAÇÃO QUE TEM UM NOVO LIKE (EM TEMPO REAL)
        req.io.emit('like', post);
        
        return res.json(post);
    }
};