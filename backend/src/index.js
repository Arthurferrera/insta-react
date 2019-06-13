// PERMITE LIDAR COM AS ROTAS, PARAMETROS E AS ROTAS
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// PERMITE QUE TODOS OS ENDEREÇOS
const cors = require('cors');

const app = express();

// DIVIDINDO A APLICACAÇÃO PARA SUPORTAR REQUISIÇÕES HTTP E WEBSOCKET
// O WEBSOCKET É O QUE PERMITE A COMUNICAÇÃO EM TEMPO REAL
const server = require('http').Server(app);
const io = require('socket.io')(server);

// CONEXAO COM O BANCO DE DADOS (STRING DE CONEXÃO OBTIDA NO NA CRIAÇÃO DO CLUSTER DO MONGODB)
mongoose.connect('mongodb+srv://react:react@cluster0-6khyq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

// PERMITINDO QUE TODAS AS ROTAS ENXERGGUEM O IO
app.use((req, res, next) => {
    req.io = io;
    // PARA NÃO "TRAVAR" NESSE PASSO, USA-SE O NEXT PARA PROSSEGUIR O FLUXO
    next();
})

// PERMITE QUE TODOS OS ENDEREÇOS(URL'S DE DIFERENTES IP'S E SERVIDORES) TENHAM ACESSO A APLICAÇÃO
// SEM ISSO O REACT NÃO TERIA ACESSO AO BACK-END
app.use(cors());

// ROTA PARA ACESSAR ARQUIVOS STATICOS (IMAGENS QUE FORAM UPADAS)
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// IMPORTANDO ARQUIVOS DAS ROTAS DA APLICAÇÃO
app.use(require('./routes'));

// SETANDO A PORTA
server.listen(3333);

