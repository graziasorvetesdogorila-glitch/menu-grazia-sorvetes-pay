const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Usado para fazer chamadas HTTP

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
// A chave será configurada no Render, escondida dos clientes
const INFINITY_PAY_KEY = process.env.INFINITY_PAY_KEY; 

app.post('/pagar', async (req, res) => {
    const orderData = req.body;

    try {
        /*
        AQUI ACONTECE A MÁGICA REAL:
        Você precisará adaptar os campos abaixo de acordo com a documentação oficial da Infinity Pay para criar um "Link de Pagamento" ou "Checkout Transparente".
        */
        
        // Exemplo genérico de como é uma requisição de pagamento:
        /*
        const response = await axios.post('URL_DA_API_DA_INFINITYPAY/v1/checkout', {
            amount: orderData.total * 100, // A maioria das APIs usa centavos (Ex: R$ 50,00 = 5000)
            payment_method: orderData.paymentMethod, // 'pix', 'credit', 'debit'
            customer_name: orderData.clientName
        }, {
            headers: { 
                'Authorization': `Bearer ${INFINITY_PAY_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ checkoutUrl: response.data.url_pagamento }); // Retorna o link para o Frontend
        */

        // TEMPORÁRIO PARA TESTES:
        // Enquanto você não coloca as chaves reais acima, o código vai simular o link:
        res.json({
            success: true,
            checkoutUrl: 'https://checkout.infinypay.com.br/exemplo-sucesso' 
        });

    } catch (error) {
        console.error('Erro na InfinityPay:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao processar pagamento com o gateway.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de pagamentos rodando na porta ${PORT}`);
});
