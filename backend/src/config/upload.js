const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        // CONFIGURANDO O DESTINO, LUGAR QUE O ARQUIVO SERÁ SALVO
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // SETANDO O NOME DO ARQUIVO, NO CASO USEI O NOME ORIGINAL DO AQUIVO
        // PARAMETROS => REQUISIÇÃO, ARQUIVO, CALLBACK 
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
};