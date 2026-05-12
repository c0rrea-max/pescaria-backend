/* =========================
   IMPORTS
========================= */

const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

/* =========================
   APP
========================= */

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(cors());
app.use(express.json());
app.use(logger);

/* =========================
   ROTA PRINCIPAL
========================= */

app.get('/', (req, res) => {

    res.json({

        sucesso: true,

        mensagem: '🎣 Bem-vindo à API da Barraca da Pescaria!'

    });

});

/* =========================
   ROTAS
========================= */

const rotasProdutos = require('./routes/produtos');
const rotasCadastros = require('./routes/cadastros');
const rotasLoja = require('./routes/loja');

/* =========================
   USAR ROTAS
========================= */

app.use('/api/produtos', rotasProdutos);
app.use('/api/cadastros', rotasCadastros);
app.use('/api/loja', rotasLoja);

/* =========================
   404
========================= */

app.use((req, res) => {

    res.status(404).json({

        sucesso: false,

        mensagem: `❌ Rota '${req.url}' não encontrada na API da Barraca da Pescaria.`

    });

});

/* =========================
   ERROS
========================= */

app.use(errorHandler);

/* =========================
   PORTA
========================= */

const PORTA = 3000;

/* =========================
   SERVIDOR
========================= */

app.listen(PORTA, () => {

    console.log('');
    console.log('🎣 ====================================');
    console.log('🔥 API BARRACA DA PESCARIA INICIADA');
    console.log(`🚀 Servidor rodando em:`);
    console.log(`👉 http://localhost:${PORTA}`);
    console.log('🎣 ====================================');
    console.log('');

    console.log('📋 ROTAS DISPONÍVEIS');
    console.log('');

    console.log('🎣 CADASTROS');
    console.log('GET    /api/cadastros');
    console.log('POST   /api/cadastros');
    console.log('PUT    /api/cadastros/:id');
    console.log('DELETE /api/cadastros/:id');
    console.log('');

    console.log('🐟 PRODUTOS');
    console.log('GET    /api/produtos');
    console.log('GET    /api/produtos/:id');
    console.log('POST   /api/produtos');
    console.log('PUT    /api/produtos/:id');
    console.log('DELETE /api/produtos/:id');
    console.log('');

    console.log('🎁 LOJA');
    console.log('GET    /api/loja');
    console.log('POST   /api/loja/resgatar');
    console.log('');

    console.log('💣 TESTE');
    console.log('GET    /api/produtos/erro-teste');
    console.log('');

});

/* =========================
   EXPORT
========================= */

module.exports = app;