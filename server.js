const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Vamos precisar do axios para falar com a API
const app = express();

app.use(cors());
app.use(express.json());

app.post('/pagar', async (req, res) => {
    try {
        const orderData = req.body;
        
        // Estrutura que a documentação pede
        const payload = {
            handle: "graziela-souza-5h5",
            items: orderData.items.map(item => ({
                quantity: item.quantity,
                price: Math.round(item.price * 100), // Preço em centavos
                description: item.name
            }))
        };

        // Chamada para a API da InfinitePay
        const response = await axios.post('https://api.infinitepay.io/v1/checkouts', payload);
        
        // Retorna o link gerado pelo banco para o seu site
        res.json({ checkoutUrl: response.data.payment_link });
        
    } catch (error) {
        console.error("Erro ao criar checkout:", error.response?.data || error.message);
        res.status(500).json({ error: "Erro ao gerar pagamento" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
