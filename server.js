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
        mensagem: '🎣 Bem-vindo à API da Barraca da Pescaria! Prepara o anzol!'
    });
});

/* =========================
   ROTAS
========================= */
const rotasCadastros = require('./routes/cadastros'); // Alterado de categorias para cadastros
const rotasProdutos = require('./routes/produtos');

/* =========================
   USAR ROTAS
========================= */
app.use('/api/cadastros', rotasCadastros);
app.use('/api/produtos', rotasProdutos);

/* =========================
   404
========================= */
app.use((req, res, next) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `🌊 Ixe! A rota '${req.url}' sumiu no fundo do lago da Pescaria.`
    });
});

/* =========================
   ERROS
========================= */
app.use(errorHandler);

/* =========================
   PORTA
========================= */
const PORTA = process.env.PORT || 3000;

/* =========================
   SERVIDOR
========================= */
app.listen(PORTA, () => {
    console.log('');
    console.log('🎏 ====================================');
    console.log('🎣 API BARRACA DA PESCARIA INICIADA');
    console.log(`🚀 O sistema está fisgando em:`);
    console.log(`👉 http://localhost:${PORTA}`);
    console.log('🎏 ====================================');
    console.log('');
    console.log('📋 MAPA DO LAGO (ROTAS DISPONÍVEIS)');
    console.log('');
    console.log('👤 CADASTROS (Pescadores/Alunos)');
    console.log('GET    /api/cadastros');
    console.log('POST   /api/cadastros');
    console.log('PUT    /api/cadastros/:id');
    console.log('DELETE /api/cadastros/:id');
    console.log('');
    console.log('🐠 PRODUTOS (Peixes e Prêmios)');
    console.log('GET    /api/produtos');
    console.log('GET    /api/produtos/:id');
    console.log('POST   /api/produtos');
    console.log('PUT    /api/produtos/:id');
    console.log('DELETE /api/produtos/:id');
    console.log('');
    console.log('⚠️  TESTE DE REDE');
    console.log('GET    /api/produtos/erro-teste');
    console.log('');
});

/* =========================
   EXPORT
========================= */
module.exports = app;