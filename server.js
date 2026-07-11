const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve o cardápio (index.html) de forma pública a partir da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota protegida para criar a cobrança Pix na InfinitePay
app.post('/api/criar-pix', async (req, res) => {
    const { valor } = req.body;

    try {
        // Chamada à API da InfinitePay para gerar transação Pix dinamicamente
        const response = await axios.post('https://api.infinitepay.io/v1/pix/transactions', {
            amount: Math.round(valor * 100), // Converte o valor para centavos (Ex: R$ 10,00 vira 1000)
            capture: true
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.INFINITEPAY_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        // Retorna a string Pix Copia e Cola gerada para o seu front-end
        res.json({
            sucesso: true,
            qrcode: response.data.brcode // Campo que contém a chave copia e cola padrão
        });
    } catch (error) {
        console.error('Erro na API da InfinitePay:', error.response ? error.response.data : error.message);
        res.status(500).json({ sucesso: false, erro: 'Falha ao gerar o Pix dinâmico.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ativado com sucesso na porta ${PORT}`));
